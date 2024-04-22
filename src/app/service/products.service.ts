import {
  effect,
  Injectable,
  Injector,
  signal,
  WritableSignal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop'
import { type ProductDetails, type Product, ProductResponse} from '../types/types'
import { ProductData } from './product-data'
import { getDetailsProductById, getMappedData } from '../utils/load-json'
import { map, debounceTime, Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends ProductData {
  public productList = signal<Product[]>([]);
  constructor(
    private readonly http: HttpClient,
    private injector: Injector,
  ) {
    super();
  }

  override getProductInfo(
    start: number,
    limit: number,
  ): Observable<ProductResponse> {
    return this.http.get('assets/mocks/data.json').pipe(
      debounceTime(5000),
      map((value: any) => {
        return getMappedData(value, start, limit);
      }),
    );
  }

  override getDetailsByProductId(id: string): Observable<ProductDetails | null> {
    return this.http.get('assets/mocks/data.json').pipe(
      debounceTime(5000),
      map((value: any) => {
        return getDetailsProductById(value, id);
      }),
    );
  }

  override addProductToFavorites(id: number): void {
    throw new Error('Method not implemented.');
  }
}
