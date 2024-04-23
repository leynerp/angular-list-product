import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectElementsService {
  public selected = signal<string>('');
  getSelected(): string {
    return this.selected();
  }
  changeSelected(id: string): void {  
    this.selected.set(id);
  }
}
