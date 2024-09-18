import { Injectable } from '@angular/core';

import { FavoriteModel } from '../models/favorite';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {}

  // set a key-value item in local storage
  private setItem(key: string, value: any): boolean {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
      return true;
    } catch (error) {
      console.error('Error saving to localStorage', error);
      return false;
    }
  }
  // get a item from local storage by key
  private getItem(key: string): any {
    try {
      const serializedValue = localStorage.getItem(key);
      return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
      console.error('Error getting data from localStorage', error);
      return null;
    }
  }
  // remove a item from local storage by key
  private removeItem(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing data from localStorage', error);
      return false;
    }
  }
  // add item to local storage with key=favorites
  public addFavorites(favorite: FavoriteModel): boolean {
    const favorites = this.getItem('favorites');
    if (favorites) {
      favorites.push(favorite);
      return this.setItem('favorites', favorites);
    } else {
      return this.setItem('favorites', [favorite]);
    }
  }
  // get favorites from local storage
  public getFavorites(): FavoriteModel[] {
    return this.getItem('favorites') || [];
  }
  // remove favorite from local storage at key 'favorites' by bookId
  public removeFavorite(bookId: string): boolean {
    const favorites = this.getItem('favorites');
    if (favorites) {
      const newFavorites = favorites.filter((f: any) => f.id !== bookId);
      return this.setItem('favorites', newFavorites);
    } else {
      return false;
    }
  }
  // check if a book is favorited
  public isFavorited(bookId: string): boolean {
    const favorites = this.getItem('favorites');
    if (favorites) {
      return favorites.some((f: any) => f.id === bookId);
    } else {
      return false;
    }
  }
}
