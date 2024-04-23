import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  inject,
  signal,
} from '@angular/core';
import { PAGINATION_LIMIT } from 'src/app/const/const';
import { ProductsService } from 'src/app/service/products.service';
import { Product, ProductResponse } from 'src/app/types/types';
import { ItemListComponent } from '../item-list/item-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SelectElementsService } from 'src/app/service/select-elements.service';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, ItemListComponent, InfiniteScrollModule],
})
export class ProductListComponent implements OnInit {
  public productApiResponse = signal<ProductResponse>({
    products: [],
    totalElements: 0,
    next: true,
    prev: false,
  });
  searchValue!: string;
  private readonly searchText$ = new Subject<string>();
  private actualPage: number = 1;
  public productList = signal<Product[]>([]);
  private readonly productService = inject(ProductsService);
  private readonly selectedService = inject(SelectElementsService);
  private route = inject(Router);

  constructor() {
    effect(() => {
      const id = this.selectedService.selected();
      if (id) this.route.navigate([`/details/${id}`]);

      //
      this.selectedService.selected();
    });
  }
  ngOnInit(): void {
    this.getProductData();
    //TODO review linter
    const $textSearch = this.searchText$.pipe(debounceTime(500), distinctUntilChanged());
    $textSearch.subscribe((value) => {
      if (value.length === 0) {
        this.productList.set(this.productService.productList());
        return;
      }
      this.searchProducts(value);
    });
  }
  searchProducts(search: string) {
    const products:Product[]=this.productList();
    const productsFounder: Product[] = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
    this.productList.set(productsFounder)
  }
  getProductData() {
    const start = (this.actualPage - 1) * PAGINATION_LIMIT;
    const limit = start + PAGINATION_LIMIT;
    this.productService
      .getProductInfo(start, limit)
      .subscribe((productsResponse) => {
        this.productApiResponse.set(productsResponse);
        this.productList.update((prevProducts) => [
          ...prevProducts,
          ...productsResponse.products,
        ]);
        this.productService.productList.set(this.productList());
      });
  }
  onScrollDown() {
    this.actualPage++;
    this.getProductData();
  }

  onScrollUp() {}
  onChangeSearch(pokeName: string): void {
    this.searchText$.next(pokeName);
  }
  clearSearch(): void {
    this.searchValue = '';
    this.searchText$.next('');   
  }
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }
}
