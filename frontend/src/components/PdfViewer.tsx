// TODO: implement highlight based on offset and length (or string matching?)
// TODO: export page number and other state to parent
import {
  Component,
  Show,
  createSignal,
  createEffect,
  onMount,
  onCleanup,
  splitProps,
} from "solid-js";
import * as pdfjsLib from "pdfjs-dist";
import { Pagination } from "./Pagination";
import "../../node_modules/pdfjs-dist/web/pdf_viewer.css";
import {
  PDFDocumentProxy,
  RenderParameters,
} from "pdfjs-dist/types/src/display/api";
import { DocQuote } from "../types";
import { JSX } from "solid-js";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "../../node_modules/pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url,
).href; // use new url to make sure vite includes it
const CMAP_URL = new URL(
  "../../node_modules/pdfjs-dist/cmaps/",
  import.meta.url,
).href;
const CMAP_PACKED = true;
const XFA = true;

const highlightRange = (
  contentDiv: HTMLDivElement,
  startIndex: number,
  length: number,
) => {
  // Get all the spans within the content div
  const spans = contentDiv.querySelectorAll("span");
  let currentIndex = 0;
  let remainingLength = length;

  // Iterate through each span
  spans.forEach((span) => {
    const spanText = span.textContent!;
    const spanLength = spanText.length;

    // Check if the current span is within the range to highlight
    if (currentIndex + spanLength < startIndex) {
      // Move the current index forward
      currentIndex += spanLength;
      return; // Skip this span
    }

    // Calculate the start and end index for the highlight within this span
    const highlightStart = Math.max(0, startIndex - currentIndex);
    const highlightEnd = Math.min(spanLength, highlightStart + remainingLength);

    // If the highlight range is valid
    if (highlightStart < highlightEnd) {
      // We can fit the highlight into this span, dont make another span.
      if (highlightStart === 0 && highlightEnd === spanLength) {
        span.className = "highlight";
      } else {
        // Create a new span for the highlighted text
        const highlightSpan = document.createElement("span");
        highlightSpan.className = "highlight"; // Set the highlight class
        highlightSpan.textContent = spanText.substring(
          highlightStart,
          highlightEnd,
        );

        // Insert the highlight span into the DOM
        span.innerHTML =
          spanText.substring(0, highlightStart) +
          highlightSpan.outerHTML +
          spanText.substring(highlightEnd);
      }
      // Update the remaining length to highlight
      remainingLength -= highlightEnd - highlightStart;
    }

    // Update the current index
    currentIndex += spanLength;

    // If there's no remaining length to highlight, exit the loop
    if (remainingLength <= 0) {
      return false; // Break the loop
    }
  });
};

interface PdfViewerProps {
  src: string;
  scale: number;
}

export const PdfViewer: Component<
  PdfViewerProps & JSX.IntrinsicElements["div"]
> = (props) => {
  let canvas!: HTMLCanvasElement, textContainer!: HTMLDivElement;
  const [localProps, otherProps] = splitProps(props, ["src", "scale"]);
  const [pageNum, setPageNum] = createSignal<number>(1);
  const [pdf, setPdf] = createSignal<PDFDocumentProxy>(
    null as unknown as PDFDocumentProxy,
  );
  const [focusedQuote, setFocusedQuote] = createSignal<DocQuote>(
    null as unknown as DocQuote,
  );
  const totalPages = () => (pdf() ? pdf().numPages : 0);

  // every time pageNum changes, render the page and text
  // TODO: make this memo
  createEffect(async () => {
    if (pdf()) {
      await renderPage(pageNum());
      // does not support multi-page quotes.
      if (pageNum() === focusedQuote().pageNumber) {
        highlightRange(
          textContainer,
          focusedQuote().start,
          focusedQuote().length,
        );
      }
    }
  });
  onMount(async () => {
    const pdfDocument: PDFDocumentProxy = await pdfjsLib.getDocument({
      cMapPacked: CMAP_PACKED,
      cMapUrl: CMAP_URL,
      enableXfa: XFA,
      url: localProps.src,
    }).promise;
    setPdf(pdfDocument);
    // for testing purposes:
    setFocusedQuote({
      pdfUrl: localProps.src,
      pageNumber: 2,
      start: 10,
      length: 100,
    });
  });

  const renderPage = async (num: number) => {
    if (pdf()) {
      console.log("Rendering page...");
      // TODO: use createMemo for each page so we can cache?
      const page = await pdf().getPage(num);
      const viewport = page.getViewport({ scale: localProps.scale });
      const ctx = canvas.getContext("2d")!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext: RenderParameters = {
        canvasContext: ctx,
        viewport: viewport,
      };
      await page.render(renderContext).promise;
      // text layer
      const textContent = await page.getTextContent();
      const textLayer = new pdfjsLib.TextLayer({
        textContentSource: textContent,
        viewport: viewport,
        container: textContainer,
      });
      // clear the previous text
      textContainer.innerHTML = "";
      await textLayer.render();
      // this is important
      textContainer.style.setProperty(
        "--scale-factor",
        localProps.scale.toString(),
      );
    }
  };

  onCleanup(() => {
    // Cleanup if necessary
  });
  return (
    <Show when={pdf()} fallback={<h1>Loading...</h1>}>
      <div {...otherProps} class="">
        <div class="pdfViewer relative">
          <canvas ref={canvas}></canvas>
          <div ref={textContainer} class="textLayer"></div>
        </div>
        <Pagination
          currentPage={pageNum}
          setPage={setPageNum}
          maxPages={totalPages}
        />
        <button
          class="btn btn-outline"
          onClick={() => setPageNum(focusedQuote().pageNumber)}
        >
          Jump to quote
        </button>
      </div>
    </Show>
  );
};
