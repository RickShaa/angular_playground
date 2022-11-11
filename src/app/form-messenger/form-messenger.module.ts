import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormMessengerComponent } from './form-messenger.component';

@NgModule({
  declarations: [FormMessengerComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FormMessengerComponent],
})
export class FormMessengerModule {}
