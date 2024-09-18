export interface PdfDocument {
  fileSize: number; // Size of the file in bytes
  name: string; // Name of the PDF file
  url: string; // URL where the PDF is hosted
  previewUrl: string; // URL to a png for the first page of the document
  pages: number; // Number of pages in the PDF document
  dateAdded: Date; // Date when the PDF was added
}

export interface DocumentLibrary {
  totalSize: number; // size of every child in bytes
  name: string; // Name of the PDF file
  docs: Array<PdfDocument>; // list of PdfDocuments
  dateAdded: Date; // Date created
}
