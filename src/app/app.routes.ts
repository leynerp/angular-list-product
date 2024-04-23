import { Route } from '@angular/router';


export const APP_ROUTES: Route[] = [
  {
    path: 'list',
    loadComponent: () =>
      import('./components/product-list/product-list.component').then(
        (mod) => mod.ProductListComponent,
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/product-list/product-list.component').then(
        (mod) => mod.ProductListComponent,
      ),
  },
  {
    path: 'details/:id',
    pathMatch: 'full',
    loadComponent: () =>
      import('./components/products-details/products-details.component').then(
        (mod) => mod.ProductsDetailsComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/page-not-found/page-not-found.component').then(
        (mod) => mod.PageNotFoundComponent,
      ),
  },
];
