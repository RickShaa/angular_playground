import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ToggleProviderDirective } from './toggle.toggleProvider.directive';

@Component({
  selector: 'toggle-button',
  template:
    '<mat-slide-toggle [checked]="toggleProvider.toggle.on" (toggleChange)="toggle()"></mat-slide-toggle>',
  styles: [],
})
export class ToggleButtonComponent {
  constructor(public toggleProvider: ToggleProviderDirective) {}

  toggle() {
    this.toggleProvider.toggle.setOnState(!this.toggleProvider.toggle.on);
  }
}
