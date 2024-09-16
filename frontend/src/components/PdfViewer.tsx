import {
  Component,
  createSignal,
  createEffect,
  createResource,
  onMount,
  onCleanup,
} from "solid-js";
import * as pdfjsLib from "pdfjs-dist";
interface PdfViewerProps {
  src: string;
}

pdfjsLib.GlobalWorkerOptions.workerSrc =
  "../../node_modules/pdfjs-dist/build/pdf.worker.mjs";

export const PdfViewer: Component<PdfViewerProps> = (props) => {
  let canvas, textContainer;
  const [pageNum, setPageNum] = createSignal<number>(1);
  const [pdf, setPdf] = createSignal(null);
  const totalPages = () => pdf().numPages;
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage < totalPages()) {
      setPageNum(newPage);
    }
  };
  createEffect(() => {
    renderPage(pageNum());
  });
  onMount(async () => {
    const pdfDocument = await pdfjsLib.getDocument(props.src).promise;
    setPdf(pdfDocument);
  });

  const renderPage = async (num) => {
    // TODO: use createMemo for each page so we can cache?
    const page = await pdf().getPage(num);
    const viewport = page.getViewport({ scale: 1 });
    const cv = canvas.getContext("2d");
    cv.canvas.width = viewport.width;
    cv.canvas.height = viewport.height;

    const renderContext = {
      canvasContext: cv,
      viewport: viewport,
    };
    await page.render(renderContext).promise;
  };

  onCleanup(() => {
    // Cleanup if necessary
  });
  return (
    <div>
      <canvas class="shadow rounded border-primary" ref={canvas}></canvas>
      <div ref={textContainer}></div>
      <div class="join">
        <button
          onClick={() => handlePageChange(pageNum() - 1)}
          class="join-item btn"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(pageNum() + 1)}
          class="join-item btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};
