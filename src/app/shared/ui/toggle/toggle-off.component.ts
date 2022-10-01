import { Component, Input } from '@angular/core';
import { ToggleDirective } from './toggle.directive';
import { ToggleProviderDirective } from './toggle.toggleProvider.directive';
@Component({
  selector: 'toggle-off',
  template: '<ng-content *ngIf="!toggleProvider.toggle.on"></ng-content>',
  styles: [],
})
export class ToggleOffComponent {
  constructor(public toggleProvider: ToggleProviderDirective) {}
}
