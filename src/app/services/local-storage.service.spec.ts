import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';
import { FavoriteModel } from '../models/favorite';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  const mockFavorite: FavoriteModel = {
    id: 'testId',
    stars: 5,
    notes: 'testNotes',
    tags: ['testTag1', 'testTag2'],
    title: 'testTitle',
    image: 'testImage'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set, get and remove favorite', () => {
    service.addFavorites(mockFavorite);
    expect(service.getFavorites())
      .withContext("Favorite should be into the list")
      .toEqual([mockFavorite]);
    expect(service.isFavorited(mockFavorite.id))
      .withContext("Favorite id should be return favorited")
      .toBeTrue();
    service.removeFavorite(mockFavorite.id);
    expect(service.isFavorited(mockFavorite.id))
      .withContext("Favorite should be removed")
      .toBeFalse();
  });
});
