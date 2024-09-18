import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, throwError } from 'rxjs';

import { BookModel } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public token = 'AIzaSyC1DsJIWfcA6TqyINyk32Yc1CyD-UM4BEU';
  public uid = '117522004192189783614';
  
  constructor(private http: HttpClient) {}

  // search books
  public searchBooks(query: string, startIndex: number=0, orderBy:string='relevance', filter:string='', langRestrict:string=''): Observable<{books: BookModel[], totalItems: number}> {
    // build the query
    const queryReq = filter === '' ?
      `https://www.googleapis.com/books/v1/volumes?q=${query}&printType=books&startIndex=${startIndex}&orderBy=${orderBy}&langRestrict=${langRestrict}&key=${this.token}`
    :
      `https://www.googleapis.com/books/v1/volumes?q=${query}&printType=books&startIndex=${startIndex}&orderBy=${orderBy}&filter=${filter}&langRestrict=${langRestrict}&key=${this.token}`
    ;
    
    return this.http.get(queryReq).pipe(
      map((data: any) => {
        console.log('data:', data);
        
        const totalItems: number = data.totalItems;
        // map the data to the BookModel
        const books: BookModel[] = data.items.map((book: any) => ({
          id: book.id,
          accessInfo: {
            epubLink: book.accessInfo.epub.isAvailable ? book.accessInfo.epub.downloadLink || book.accessInfo.epub.acsmLink : null,
            pdfLink: book.accessInfo.pdf.isAvailable ? book.accessInfo.pdf.downloadLink || book.accessInfo.pdf.acsmLink : null,
            webReaderLink: book.accessInfo.webReaderLink
          },
          saleInfo: book.saleInfo.saleability === "FOR_SALE" ? {
            saleability: book.saleInfo.saleability,
            buyLink: book.saleInfo.buyLink,
            amount: book.saleInfo.listPrice.amount,
            currencyCode: book.saleInfo.listPrice.currencyCode
          } : {
            saleability: book.saleInfo.saleability,
          },
          volumeInfo: {
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors,
            categories: book.volumeInfo.categories,
            publisher: book.volumeInfo.publisher,
            publishedDate: book.volumeInfo.publishedDate,
            pageCount: book.volumeInfo.pageCount,
            language: book.volumeInfo.language,
            previewLink: book.volumeInfo.previewLink,
            description: book.volumeInfo.description,
            imageLinks: book.volumeInfo.imageLinks
          },
        }),
        catchError((err) =>  {
          console.log(err);
          return throwError(() => err);
        })
      );

      return { books, totalItems }
    }));
  }

  // get library by shelfId
  public getLibrary(shelId: string, startIndex: number=0): Observable<{books: BookModel[], totalItems: number}> {
    const response = this.http.get(`https://www.googleapis.com/books/v1/users/${this.uid}/bookshelves/${shelId}/volumes?startIndex=${startIndex}&key=${this.token}`);

    return response.pipe(map((data:any)=> {
      console.log('data:', data);

      // get the total items
      const totalItems: number = data.totalItems;
      // map the data to the BookModel
      const books:BookModel[] = data.items.map((book: any) => ({
        id: book.id,
        accessInfo: {
          epubLink: book.accessInfo.epub.isAvailable ? book.accessInfo.epub.downloadLink || book.accessInfo.epub.acsmLink : null,
          pdfLink: book.accessInfo.pdf.isAvailable ? book.accessInfo.pdf.downloadLink || book.accessInfo.pdf.acsmLink : null,
          webReaderLink: book.accessInfo.webReaderLink
        },
        saleInfo: book.saleInfo.saleability === "FOR_SALE" ? {
          saleability: book.saleInfo.saleability,
          buyLink: book.saleInfo.buyLink,
          amount: book.saleInfo.listPrice.amount,
          currencyCode: book.saleInfo.listPrice.currencyCode
        } : {
          saleability: book.saleInfo.saleability,
        },
        volumeInfo: {
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          categories: book.volumeInfo.categories,
          publisher: book.volumeInfo.publisher,
          publishedDate: book.volumeInfo.publishedDate,
          pageCount: book.volumeInfo.pageCount,
          language: book.volumeInfo.language,
          previewLink: book.volumeInfo.previewLink,
          description: book.volumeInfo.description,
          imageLinks: book.volumeInfo.imageLinks
        }
      }));
      return {books, totalItems}
    }));
  }

  // get book by id
  public getBook(id: string): Observable<BookModel> {

    // map the data to the BookModel
    return this.http.get(`https://www.googleapis.com/books/v1/volumes/${id}?key=${this.token}`).pipe(map((book: any) => {
      console.log('data:', book);
      
      const bookData:BookModel = {
        id: book.id,
        accessInfo: {
          epubLink: book.accessInfo.epub?.isAvailable ? book.accessInfo.epub.downloadLink || book.accessInfo.epub.acsmLink : undefined,
          pdfLink: book.accessInfo.pdf?.isAvailable ? book.accessInfo.pdf.downloadLink || book.accessInfo.pdf.acsmLink : undefined,
          webReaderLink: book.accessInfo.publicDomain ? book.accessInfo.webReaderLink : undefined
        },
        saleInfo: book.saleInfo.saleability === "FOR_SALE" ? {
          saleability: book.saleInfo.saleability,
          buyLink: book.saleInfo.buyLink,
          amount: book.saleInfo.listPrice.amount,
          currencyCode: book.saleInfo.listPrice.currencyCode
        } : {
          saleability: book.saleInfo.saleability,
        },
        volumeInfo: {
          title: book.volumeInfo.title,
          authors: book.volumeInfo.authors,
          categories: book.volumeInfo.categories,
          publisher: book.volumeInfo.publisher,
          publishedDate: book.volumeInfo.publishedDate,
          pageCount: book.volumeInfo.pageCount,
          language: book.volumeInfo.language,
          previewLink: book.volumeInfo.previewLink,
          description: book.volumeInfo.description,
          imageLinks: book.volumeInfo.imageLinks
        },
      };
      return bookData;
    }));
  }
}
