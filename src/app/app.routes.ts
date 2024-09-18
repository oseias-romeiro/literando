import { Routes } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { BookComponent } from './book/book.component';
import { LibraryComponent } from './library/library.component';
import { FavoritesComponent } from './favorites/favorites.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search/:query', component: SearchComponent },
  { path: 'book/:id', component: BookComponent },
  { path: 'biblioteca/:name/:id', component: LibraryComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '**', redirectTo: '' }
];

