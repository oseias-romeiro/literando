import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { SearchComponent } from './search.component';
import { ApiService } from '../services/api.service';
import libraryMock from '../../mocks/library.mock';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let service: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'testQuery' } },
            params: of({ query: 'testQuery' }),
          }
        }
      ]
    })
    .compileComponents();

    service = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have get results using mock results', () => {
    spyOn(service, 'searchBooks').and.returnValue(of({ books: libraryMock.books, totalItems: libraryMock.totalItems }));

    // load page of books
    component.loadPage(1);
    fixture.detectChanges();

    expect(component.results)
      .withContext('results should be the items from the mock library')
      .toEqual(libraryMock.books);
    expect(component.maxPages)
      .withContext('maxPages should be the totalItems divided by the pageSize rounded up')
      .toEqual(Math.ceil(libraryMock.totalItems / component.pageSize));
  });

  it('should have book div with data of each book in mock', ()=>{
    spyOn(service, 'searchBooks').and.returnValue(of({ books: libraryMock.books, totalItems: libraryMock.totalItems }));

    // load page of books
    component.loadPage(1);
    fixture.detectChanges();

    libraryMock.books.forEach((book) => {
      const bookDiv: HTMLHeadingElement = fixture.nativeElement.querySelector('[data-testId="book-div"]');
      expect(bookDiv.id)
        .withContext(`should have the id ${book.id}`)
        .toEqual(book.id);
    });
  })
});
