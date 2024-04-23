import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductsService } from 'src/app/service/products.service';
import { Gender, ProductDetails } from 'src/app/types/types';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetailsComponent  {
 
}
