import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColorPipe } from '../pipes/color.pipe';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, ColorPipe],
  templateUrl: './item-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCardComponent {
  @Input() name!: string;
  @Input() image!: string;
  @Input() color!: string;
  @Input() badgeStyle!: string;
  @Input() price!: number;
  selectElement(arg0: ItemCardComponent) {
    throw new Error('Method not implemented.');
  }
  
}
