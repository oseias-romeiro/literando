import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// services
import { ApiService } from '../services/api.service';
import { LocalStorageService } from '../services/local-storage.service';
import { NotificationsService } from '../services/notifications.service';
// components
import { LoadingComponent } from '../components/loading/loading.component';
// models
import { FavoriteModel } from '../models/favorite';
import { BookModel } from '../models/book';


@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent implements OnInit {
  public isLoading: boolean = true;
  public bookId: string = '';
  public bookData: BookModel;
  private modalService = inject(NgbModal);
  public stars: number = 0;
  public favorited: boolean = false;
  public notes: string = '';
  public tags: string[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService, private localStorage: LocalStorageService, private notificationsService: NotificationsService) {
    this.bookData = {
      id: '',
      volumeInfo: {},
      saleInfo: {},
      accessInfo: {}
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.bookId = params['id'];
      this.favorited = this.localStorage.isFavorited(this.bookId);
    });

    this.apiService.getBook(this.bookId).subscribe((book: BookModel) => {
      this.bookData = book;
      this.isLoading = false;
    });
  }
  openModal(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				console.log(`Closed with: ${result}`);
        if (result === 'Save click') {
          const favorite: FavoriteModel = {
            id: this.bookId,
            stars: this.stars,
            notes: this.notes,
            tags: this.tags,
            title: this.bookData.volumeInfo.title || 'No title',
            image: this.bookData.volumeInfo.imageLinks?.thumbnail || this.bookData.volumeInfo.imageLinks?.small || this.bookData.volumeInfo.imageLinks?.medium || this.bookData.volumeInfo.imageLinks?.large || 'images/logo.png'
          };
          // save to local storage
          if (this.localStorage.addFavorites(favorite)){
            this.favorited = true;
            // alert
            this.notificationsService.setNotifiction({
              message: 'Livro adicionado aos favoritos',
              type: 'success'
            });
          }else {
            this.notificationsService.setNotifiction({
              message: 'Erro ao adicionar livro aos favoritos',
              type: 'danger'
            });
          }
        }
			},
			(reason) => {
				console.log(`Dismissed ${reason}`);
        this.tags = [];
			},
		);
	}
  addTag(event: any) {
    const tag = event.target.value;
    if (tag[tag.length-1] === ' ') {
      this.tags.push(tag);
      event.target.value = '';
    };
  }
  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }
  saveNotes(event: any) {
    this.notes = event.target.value;
  }
  removeFavorite() {
    if(this.localStorage.removeFavorite(this.bookId)){
      this.favorited = false;
      this.notificationsService.setNotifiction({
        message: 'Livro removido dos favoritos',
        type: 'warning'
      });
    }else {
      this.notificationsService.setNotifiction({
        message: 'Erro ao remover livro dos favoritos',
        type: 'danger'
      });
    }
  }
}
