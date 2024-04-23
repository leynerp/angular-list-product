import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorPipe',
  standalone: true,
})
export class ColorPipe implements PipeTransform {
  transform(value: string): string {
    const colorCount = value.split('/').length;
    return `${colorCount} colors`;
  }
}
