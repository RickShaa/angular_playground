import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponentsComponent } from './form-components.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    FormComponentsComponent
  ],
  exports: [
    FormComponentsComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule
  ],
})
export class FormComponentsModule { }
