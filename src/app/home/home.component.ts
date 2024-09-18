import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../services/api.service';
import { LoadingComponent } from '../components/loading/loading.component';
import { BookModel } from '../models/book';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgbCarouselModule, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public trendingBooks: Array<BookModel[]> = [];
  public isLoading:boolean = true;

  constructor(private apiService: ApiService) {}

  ngOnInit():void {
    this.apiService.getLibrary('1031').subscribe(({books, totalItems})=>{
      this.trendingBooks = books.reduce((acc: Array<BookModel[]>, book: BookModel, index: number) => {
        const groupIndex = Math.floor(index / 3);
        if (!acc[groupIndex]) {
          acc[groupIndex] = [];
        }
        acc[groupIndex].push(book);
        return acc;
      }, []);
      this.isLoading = false;
    });
  }
}
