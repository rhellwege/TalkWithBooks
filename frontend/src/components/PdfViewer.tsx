import {
  Component,
  Show,
  createSignal,
  createEffect,
  createResource,
  onMount,
  createMemo,
  onCleanup,
} from "solid-js";
import * as pdfjsLib from "pdfjs-dist";
import { Pagination } from "./Pagination";
import "../../node_modules/pdfjs-dist/web/pdf_viewer.css";
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";
interface PdfViewerProps {
  src: string;
}

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "../../node_modules/pdfjs-dist/build/pdf.worker.mjs";
const CMAP_URL = "../../node_modules/pdfjs-dist/cmaps/";
const CMAP_PACKED = true;
const XFA = true;

export const PdfViewer: Component<PdfViewerProps> = (props) => {
  let canvas: HTMLCanvasElement, textContainer: HTMLDivElement;
  const [pageNum, setPageNum] = createSignal<number>(1);
  const [pdf, setPdf] = createSignal<PDFDocumentProxy>(
    null as unknown as PDFDocumentProxy,
  );
  const totalPages = () => (pdf() ? pdf().numPages : 0);
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage < totalPages()) {
      setPageNum(newPage);
    }
  };

  // every time pageNum changes, render the page and text
  // TODO: make this memo
  createEffect(() => {
    if (pdf()) {
      renderPage(pageNum());
    }
  });
  onMount(async () => {
    const pdfDocument: PDFDocumentProxy = await pdfjsLib.getDocument({
      cMapPacked: CMAP_PACKED,
      cMapUrl: CMAP_URL,
      enableXfa: XFA,
      url: props.src,
    }).promise;
    setPdf(pdfDocument);
  });

  const renderPage = async (num: number) => {
    if (pdf()) {
      console.log("Rendering page...");
      // TODO: use createMemo for each page so we can cache?
      const page = await pdf().getPage(num);
      const viewport = page.getViewport({ scale: 1 });
      const ctx = canvas.getContext("2d");
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      const renderContext = {
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
    }
  };

  onCleanup(() => {
    // Cleanup if necessary
  });
  return (
    <Show when={pdf()} fallback={<h1>Loading...</h1>}>
      <div class="">
        <div class="pdfViewer relative">
          <canvas ref={canvas} class="shadow rounded border-primary"></canvas>
          <div ref={textContainer} class="textLayer highlight"></div>
        </div>
        <div class="join">
          <button
            onClick={() => handlePageChange(pageNum() - 1)}
            class={"join-item btn " + (pageNum() <= 1 ? "btn-disabled" : "")}
          >
            Previous
          </button>
          <button
            onClick={() => handlePageChange(pageNum() + 1)}
            class={
              "join-item btn " +
              (pageNum() >= totalPages() - 1 ? "btn-disabled" : "")
            }
          >
            Next
          </button>
        </div>
      </div>
    </Show>
  );
};
