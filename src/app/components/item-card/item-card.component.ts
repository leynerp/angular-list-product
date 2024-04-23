import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, Input, inject } from '@angular/core';
import { ColorPipe } from 'src/app/pipes/color.pipe';
import { SelectElementsService } from 'src/app/service/select-elements.service';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, ColorPipe],
  templateUrl: './item-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemCardComponent {
  private selectedService = inject(SelectElementsService);
  @Input() name!: string;
  @Input() id!: string;
  @Input() image!: string;
  @Input() color!: string;
  @Input() badgeStyle!: string;
  @Input() price!: number;
  handlerOnClick($event: MouseEvent) {
    const { id } = $event.target as HTMLDivElement;
    this.selectedService.changeSelected(id);
  }
}
