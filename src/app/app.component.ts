import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  formGroup:FormGroup = this.fb.group({
    control: new FormControl('', Validators.required),
  })
  constructor(private fb:UntypedFormBuilder) {
    this.formGroup.valueChanges.subscribe(console.log)
    this.formGroup.markAllAsTouched()
  }

  getControl(){
    return this.formGroup.get('control')! as FormControl<string>
  }
}
