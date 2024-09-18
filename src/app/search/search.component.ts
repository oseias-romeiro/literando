import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../services/api.service';
import { LoadingComponent } from '../components/loading/loading.component';
import { BookModel } from '../models/book';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, LoadingComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  public results: BookModel[] = [];
  public query: string = '';
  public isLoading: boolean = true;
  public maxPages: number = 0;
  public page:number = 1;
  public orderby:string = 'relevance';
  public filter:string = '';
  public langRestrict:string = '';
  public error:boolean = false;
  public pageSize:number = 10;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  
  ngOnInit():void {
    // search books
    this.route.params.subscribe(params => {
      this.query = params['q'];
      console.log('Query:', this.query);
    });

    // load first page
    this.loadPage(1);
  }

  // load page of books by page number
  loadPage(page:number):void {
    this.page = page;
    this.isLoading = true;

    // search book with query, filter, orders and restrictions
    this.apiService.searchBooks(this.query, (page-1)*this.pageSize, this.orderby, this.filter, this.langRestrict).subscribe({
      next: ({books, totalItems}) => {
        // calculate max pages to paginations
        this.maxPages = Math.ceil(totalItems / this.pageSize);
        // set results
        this.results = books;
        this.isLoading = false;
      },
      error: (err) =>{
        this.isLoading = false;
        this.error = true;
      }
    });
  }
  // reload page with new order
  changeOrder(order:string):void {
    this.orderby = order;
    this.loadPage(this.page);
  }
  // reload page with new filter
  applyFilter(filter:string):void {
    this.filter = filter;
    this.loadPage(this.page);
  }
  // reload page with new language restriction
  changeLanguage(event: any):void {
    if (event.target.value.length >= 2 || event.target.value === '') {
      this.langRestrict = event.target.value;
      setTimeout(() => {
        this.loadPage(this.page);
      }, 500);
    }
  }
}
