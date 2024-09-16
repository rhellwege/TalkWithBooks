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
  let canvas, textLayer;
  const [pageNum, setPageNum] = createSignal<number>(1);
  const [pdf, setPdf] = createSignal(null);
  onMount(async () => {
    // console.log("hello world");
    // const loadingTask = pdfjs.getDocument(props.src);
    // const pdfDocument = await loadingTask.promise;
    // console.log(pdfDocument);
    // setPdf(pdfDocument);
    // renderPage(pageNum());
    // console.log(canvas);
    var loadingTask = pdfjsLib.getDocument(props.src);
    loadingTask.promise.then(
      function (pdf) {
        console.log("PDF loaded");

        // Fetch the first page
        var pageNumber = 1;
        pdf.getPage(pageNumber).then(function (page) {
          console.log("Page loaded");

          var scale = 1.0;
          var viewport = page.getViewport({ scale: scale });

          // Prepare canvas using PDF page dimensions
          var context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render PDF page into canvas context
          var renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          var renderTask = page.render(renderContext);
          renderTask.promise.then(function () {
            console.log("Page rendered");
          });
        });
      },
      function (reason) {
        // PDF loading error
        console.error(reason);
      },
    );
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
      <canvas class="shadow rounded border-primary" ref={canvas}></canvas>
      <div ref={textLayer}></div>
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
