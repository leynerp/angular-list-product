import { ProductResponse, type Product, type ProductDetails } from '../types/types'
import { Observable } from 'rxjs';

export abstract class ProductData {
  abstract getProductInfo(
    start: number,
    limit: number,
  ): Observable<ProductResponse>;
  abstract getDetailsByProductId(id: string): Observable<ProductDetails | null>;
  abstract addProductToFavorites(id: number): void;
}
