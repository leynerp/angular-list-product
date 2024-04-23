import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/service/products.service';
import { SelectElementsService } from 'src/app/service/select-elements.service';
import { Gender, ProductDetails } from 'src/app/types/types';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetailsComponent implements OnInit {
  productDetails = signal<ProductDetails>({
    id: '',
    salePrice: 0,
    gender: Gender.M,
    images: [],
    link: '',
    previewTo: new Date(),
    discountText: '',
  });
  private routeActive = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  private selectedService = inject(SelectElementsService);
  private productFound: boolean = true;
  private route = inject(Router);

  ngOnInit(): void {
    this.routeActive.paramMap
      .pipe(
        switchMap((params: ParamMap) =>
          this.productService.getDetailsByProductId(params.get('id')!),
        ),
      )
      .subscribe((value) => {
        this.productFound = !!value;
        if (value != null){
          this.productDetails.set(value);
        }else{
           this.selectedService.changeSelected('');
           this.route.navigate(['/not-found']);
        }
          
      });
  }
  handlerGoHome() {
      this.selectedService.changeSelected('');
      this.route.navigate(['/list']);
  }
}
