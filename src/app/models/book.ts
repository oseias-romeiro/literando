
export interface BookModel {
  id: string;
  accessInfo: {
    epubLink?:string,
    pdfLink?:string,
    webReaderLink?: string
  };
  saleInfo: {
    saleability?: string;
    buyLink?: string;
    amount?: number;
    currencyCode?: string;
  };
  volumeInfo: {
    title?: string;
    authors?: string[];
    categories?: string[];
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
    language?: string;
    previewLink?: string;
    description?: string;
    imageLinks?: {
      large?: string;
      medium?: string;
      small?: string;
      thumbnail?: string;
      smallThumbnail?: string;
    }
  };
}
