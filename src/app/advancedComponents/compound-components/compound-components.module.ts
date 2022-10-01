import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompoundComponentsComponent } from './compound-components.component';
import { ToggleModule } from 'src/app/shared/ui/toggle/toggle.module';

@NgModule({
  declarations: [CompoundComponentsComponent],
  imports: [CommonModule, ToggleModule],
  exports: [CompoundComponentsComponent],
})
export class CompoundComponentsModule {}
