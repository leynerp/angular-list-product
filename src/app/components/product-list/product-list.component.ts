import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, effect, inject, signal } from '@angular/core';
import { PAGINATION_LIMIT } from 'src/app/const/const';
import { ProductsService } from 'src/app/service/products.service';
import { Product, ProductResponse } from 'src/app/types/types';
import { ItemListComponent } from "../item-list/item-list.component";
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SelectElementsService } from 'src/app/service/select-elements.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ItemListComponent, InfiniteScrollModule],
})
export class ProductListComponent implements OnInit {
  public productApiResponse = signal<ProductResponse>({
    products: [],
    totalElements: 0,
    next: true,
    prev: false,
  });
  private actualPage: number = 1;
  public productList = signal<Product[]>([]);
  private readonly productService = inject(ProductsService);
  private readonly selectedService = inject(SelectElementsService);
  private route = inject(Router);

  constructor() {
    effect(() => {
      const id=this.selectedService.selected();
      console.log(id);
      if (id)
        this.route.navigate([`/details/${id}`]); 
      
      //
      this.selectedService.selected();
    });
  }
  ngOnInit(): void {
    this.getProductData();
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
      });
  }
  onScrollDown() {
    this.actualPage++;
    this.getProductData();
  }

  onScrollUp() {}
}
