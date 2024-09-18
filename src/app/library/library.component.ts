import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { ApiService } from '../services/api.service';
import { LoadingComponent } from '../components/loading/loading.component';
import { BookModel } from '../models/book';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, LoadingComponent],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent implements OnInit {
  public isLoading: boolean = true;
  public libId: string = '';
  public books: BookModel[] = [];
  public maxPages: number = 0;
  public page:number = 1;
  public title:string = '';

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit():void {
    this.route.params.subscribe(params => {
      this.libId = params['id'];
      this.title = params['name'];
    });

   this.loadPage(this.page);
  }
  loadPage(page:number):void {
    this.page = page;
    this.isLoading = true;

    this.apiService.getLibrary(this.libId, (this.page-1)*10).subscribe(({books, totalItems}) => {
      this.maxPages = Math.ceil(totalItems / 10);
      this.books = books;
      this.isLoading = false;
    })
  }
}
