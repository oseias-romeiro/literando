import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { BookModel } from '../models/book';

// mocks
import bookRawMock from '../../mocks/bookRaw.mock';
import libraryRawMock from '../../mocks/libraryRaw.mock';
import bookMock from '../../mocks/book.mock';
import libraryMock from '../../mocks/library.mock';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve book data processed equal to book mock', () => {

    service.getBook(bookRawMock.id).subscribe((response:BookModel) => {
      expect(response).toEqual(bookMock);
    });

    const req = httpMock.expectOne(`https://www.googleapis.com/books/v1/volumes/${bookRawMock.id}?key=${service.token}`);
    expect(req.request.method).toBe('GET');
    req.flush(bookRawMock);
  });
  
  it('should retrieve library by id', () => {
    
    service.getLibrary(libraryRawMock.id).subscribe(response => {
      expect(response.totalItems)
        .withContext('totalItems should be the same as the mock')
        .toEqual(libraryRawMock.totalItems);
      expect(response.books)
        .withContext('books should be the same as the mock')
        .toEqual(libraryMock.books);
    });

    const req = httpMock.expectOne(`https://www.googleapis.com/books/v1/users/${service.uid}/bookshelves/${libraryRawMock.id}/volumes?startIndex=0&key=${service.token}`);
    expect(req.request.method).toBe('GET');
    req.flush(libraryRawMock);
  });
  
  it('should retrieve book by query', () => {
    const mockQuery = 'testQuery';
    
    service.searchBooks(mockQuery).subscribe(response => {
      expect(response.totalItems)
        .withContext('totalItems should be the same as the mock')
        .toEqual(libraryRawMock.totalItems);
      expect(response.books)
        .withContext('books should be the same as the mock')
        .toEqual(libraryMock.books);
    });

    const req = httpMock.expectOne(`https://www.googleapis.com/books/v1/volumes?q=${mockQuery}&printType=books&startIndex=0&orderBy=relevance&langRestrict=&key=${service.token}`);
    expect(req.request.method).toBe('GET');
    req.flush(libraryRawMock);
  });
  
});
