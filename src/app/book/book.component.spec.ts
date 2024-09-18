import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { BookComponent } from './book.component';
import { ApiService } from '../services/api.service';

import bookMock from '../../mocks/book.mock';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let service: ApiService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => bookMock.id } },
            params: of({ id: bookMock.id }),
          }
        }
      ]
    })
    .compileComponents();

    service = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('h1 should contain book title', async () => {
    spyOn(service, 'getBook').and.returnValue(of(bookMock));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.bookData)
      .withContext('bookData should be the book from the mock')
      .toEqual(bookMock);

    const bookTitle: HTMLHeadingElement = fixture.nativeElement.querySelector('[data-testId="book-title"]');
    expect(bookTitle.innerHTML)
      .withContext('h1 should contain the title of the book')
      .toEqual(bookMock.volumeInfo.title || '');
  });
});
