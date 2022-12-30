import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompoundComponentsModule } from './advancedComponents/compound-components/compound-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormMessengerModule } from './form-messenger/form-messenger.module';
import {FormComponentsModule} from "./form-components/form-components.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    CompoundComponentsModule,
    BrowserAnimationsModule,
    FormMessengerModule,
    FormComponentsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
