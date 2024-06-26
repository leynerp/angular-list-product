import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { ProductData } from './service/product-data';
import { ProductsService } from './service/products.service';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    { provide: ProductData, useClass: ProductsService },
    importProvidersFrom(HttpClientModule),
  ],
};
