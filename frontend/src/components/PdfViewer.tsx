import {
  Component,
  createSignal,
  createEffect,
  createResource,
  onMount,
  onCleanup,
} from "solid-js";
import * as pdfjs from "pdfjs-dist";
interface PdfViewerProps {
  src: string;
}

pdfjs.GlobalWorkerOptions.workerSrc =
  "../../node_modules/pdfjs-dist/build/pdf.worker.mjs";

export const PdfViewer: Component<PdfViewerProps> = (props) => {
  let canvas;
  const [pageNum, setPageNum] = createSignal<number>(1);
  const [pdf, setPdf] = createSignal(null);
  onMount(async () => {
    console.log("hello world");
    const loadingTask = pdfjs.getDocument(props.src);
    const pdfDocument = await loadingTask.promise;
    console.log(pdfDocument);
    setPdf(pdfDocument);
    renderPage(pageNum());
    console.log(canvas);
  });

  const renderPage = async (num) => {
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

  const nextPage = () => {
    if (pdf() && pageNum() < pdf().numPages) {
      setPageNum(pageNum() + 1);
      renderPage(pageNum() + 1);
    }
  };

  const prevPage = () => {
    if (pdf() && pageNum() > 1) {
      setPageNum(pageNum() - 1);
      renderPage(pageNum() - 1);
    }
  };

  onCleanup(() => {
    // Cleanup if necessary
  });
  return (
    <div>
      <canvas class="shadow rounded, border-primary" ref={canvas}></canvas>
      <div class="join">
        <button onClick={prevPage} class="join-item btn">
          Previous
        </button>
        <button onClick={nextPage} class="join-item btn">
          Next
        </button>
      </div>
    </div>
  );
};
