import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  UntypedFormBuilder,
} from "@angular/forms";
import {BehaviorSubject, Subscription} from "rxjs";

type TOption = {
  id: number,
  optionValue:string
}
@Component({
  selector: 'app-form-components',
  template: `
    <form [style]="{width:'100%'}">
      <mat-form-field appearance="fill">
        <mat-label>Assignments</mat-label>
        <input (blur)="onTouched()"  type="text" matInput [formControl]="control" [matAutocomplete]="auto">
        <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn.bind(this)" (optionSelected)="onSelected()">
          <mat-option *ngFor="let option of filteredOptions$ | async" [value]="stringify(option.id)">
            {{option.optionValue}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
      <ng-container *ngIf="control.touched">
        <p>Its touched</p>
      </ng-container>
    </form>
  `,
  styleUrls: ['./form-components.component.sass'],
  providers: [{
    provide:NG_VALUE_ACCESSOR,
    useExisting:FormComponentsComponent,
    multi:true
  }]
})
export class FormComponentsComponent implements ControlValueAccessor,OnDestroy, OnInit {
  @Input() control!: FormControl<string>
  options: TOption[] = [{
    id: 9,
    optionValue: "Value 9"
  }, {
    id: 3,
    optionValue: "Test 3"
  }
  ]
  onChange = (val:any)=> {}
  onTouched = () => {}
  filteredOptions$:BehaviorSubject<TOption[]> = new BehaviorSubject<TOption[]>(this.options)
  private valueChangesSub: Subscription | undefined = undefined

  constructor(private fb: UntypedFormBuilder) {

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    if(this.valueChangesSub instanceof  Subscription){
      this.valueChangesSub.unsubscribe()
    }
  }

  onSelected(){
    this.onChange(this.control.value)
  }

  displayFn(value:string){
    if(!this.isValidJson(value)) return ''
    const id = (this.parseId(value) as Array<number>)[0]
    const option = this.options.find(option => option.id === id)
    return option ? option.optionValue : ''
  }

  stringify(value: number) {
    return JSON.stringify([value])
  }

  isValidJson(value:string){
    try {
     const json = (this.parseId(value) as Array<number>)
    }catch (e){
     return false
    }
    return true
  }

  parseId(value:string){
    return JSON.parse(value)
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    if(value){
      this.control.setValue(value)
    }
    this.setupValueChange()
  }

  setupValueChange(){
    if(this.valueChangesSub instanceof Subscription) return;
    this.valueChangesSub = this.control.valueChanges.subscribe(value => {
      const options = this.options.filter(option => option.optionValue.includes(value))
      this.filteredOptions$.next(options)
    })
  }
}
