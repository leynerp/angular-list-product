import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsDetailsComponent  {
 
}
