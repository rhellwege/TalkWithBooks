export interface PdfDocument {
  fileSize: number; // Size of the file in bytes
  name: string; // Name of the PDF file
  url: string; // URL where the PDF is hosted
  previewUrl: string; // URL to a png for the first page of the document
  pages: number; // Number of pages in the PDF document
  dateAdded: Date; // Date when the PDF was added
}

export interface DocQuote {
  pdfName: string; // name of the pdf document
  pageNumbers: Array<number>; // the pages the quote appears in
  startIndex: number; // the starting index of the first character (always the first page)
  quoteLength: number; // length in characters of the quote
}

export interface DocumentLibrary {
  totalSize: number; // size of every child in bytes
  name: string; // Name of the PDF file
  docs: Array<PdfDocument>; // list of PdfDocuments
  dateAdded: Date; // Date created
  description?: string; // description of the library for the user
  vectorModel: string; // the model used to encode the index
  dateEncoded: Date; // the time the model was used to create the vector database (can be redone with a different model)
}
