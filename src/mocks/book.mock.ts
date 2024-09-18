import { BookModel } from "../app/models/book";

export default {
  id: 'testBookId',
  accessInfo: {
    epubLink: 'http://example.com/epub',
    pdfLink: 'http://example.com/pdf',
    webReaderLink: 'http://example.com/webReader'
  },
  saleInfo: {
    saleability: 'FOR_SALE',
    buyLink: 'http://example.com/buyLink',
    amount: 100,
    currencyCode: 'BRL'
  },
  volumeInfo: {
    title: 'testTitle',
    authors: ['tesstAuthor1', 'tesstAuthor2'],
    categories: ['testCategoy1', 'testCategoy2'],
    publisher: 'testPublisher',
    publishedDate: '2001-01-01',
    pageCount: 100,
    language: 'pt-br',
    previewLink: 'http://example.com/previewLink',
    description: 'testDescription',
    imageLinks: {
      thumbnail: 'http://example.com/thumbnail'
    }
  }
} as BookModel;