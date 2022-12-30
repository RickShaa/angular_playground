import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, UntypedFormBuilder} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  formGroup:FormGroup = this.fb.group({
    control: new FormControl('')
  })
  constructor(private fb:UntypedFormBuilder) {
    this.formGroup.valueChanges.subscribe(console.log)
  }
}
