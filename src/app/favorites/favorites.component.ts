import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoadingComponent } from '../components/loading/loading.component';
import { LocalStorageService } from '../services/local-storage.service';
import { FavoriteModel } from '../models/favorite';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, LoadingComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit{
  public isLoading:boolean = true;
  public favorites:FavoriteModel[] = [];
  public tags: string[] = [];
  public filtredTags:boolean[] = [];

  constructor(private localStorage: LocalStorageService) {}

  ngOnInit() {
    this.favorites = this.localStorage.getFavorites();
    this.tags = Array.from(new Set(this.favorites.map(favorite => favorite.tags).flat()));
    this.filtredTags = this.tags.map(() => true);
    this.isLoading = false;
  }
  filterByTag(index: number) {
    this.filtredTags[index] = !this.filtredTags[index];
    this.favorites = this.localStorage.getFavorites();
    if (this.filtredTags.includes(false)) {
      this.favorites = this.favorites.filter(favorite => this.containsTag(favorite.tags));
    }
  }
  private containsTag(tags: string[]):boolean {
    for (let i = 0; i < tags.length; i++) {
      if (!this.filtredTags[this.tags.indexOf(tags[i])]) {
        return true;
      }
    }
    return false;
  }
}
