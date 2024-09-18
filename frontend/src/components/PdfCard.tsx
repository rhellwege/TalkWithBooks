import { Component, createSignal } from "solid-js";
import { PdfDocument } from "../types";

interface PdfCardProps {
  doc: PdfDocument;
}

export const PdfCard: Component<PdfCardProps> = (props) => {
  const [expanded, setExpanded] = createSignal(false);
  const handleDelete = () => {
    //TODO
  };
  return (
    <div class="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={props.doc.previewUrl} alt={props.doc.name} />
      </figure>
      <div class="card-body">
        <h2 class="card-title">Shoes!</h2>
        <p>{props.doc.fileSize / 1024}KB</p>
        <div class="card-actions justify-end">
          <button class="btn btn-info" onClick={handleDelete}>
            Download
          </button>
          <button class="btn btn-warning" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
