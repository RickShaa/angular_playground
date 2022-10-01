import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleDirective } from './toggle.directive';
import { ToggleOnComponent } from './toggle-on.component';
import { ToggleOffComponent } from './toggle-off.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ToggleButtonComponent } from './toggle-button.component';
import { ToggleProviderDirective } from './toggle.toggleProvider.directive';
const components = [
  ToggleOnComponent,
  ToggleDirective,
  ToggleProviderDirective,
  ToggleOffComponent,
  ToggleButtonComponent,
];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, MatSlideToggleModule],
  exports: [...components],
})
export class ToggleModule {}
