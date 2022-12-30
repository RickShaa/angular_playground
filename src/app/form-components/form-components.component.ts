import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {
  FormControl,
  UntypedFormBuilder,
} from "@angular/forms";
import {BehaviorSubject, Subscription} from "rxjs";

const OPTIONS: TOption[] = [{
  id: 9,
  optionValue: "Value 9"
}, {
  id: 1,
  optionValue: "Test 3"
}
]
type MarkTouched = (opts?: { onlySelf?: boolean | undefined; } | undefined) => void
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
        <input (blur)="onTouched()"  type="text" matInput
               [formControl]="viewControl" [matAutocomplete]="auto">

        <mat-autocomplete #auto="matAutocomplete"
                          [displayWith]="displayFn.bind(this)"
                          (optionSelected)="onSelected()">
          <mat-option *ngFor="let option of filteredOptions$ | async"
                      [value]="stringify(option.id)">
            {{option.optionValue}}
          </mat-option>
        </mat-autocomplete>
      </mat-form-field>
      <ng-container *ngIf="viewControl.touched">
        toucheed
      </ng-container>
    </form>
  `,
  styleUrls: ['./form-components.component.sass'],

})
export class FormComponentsComponent implements OnDestroy, OnInit {
  @Input() control!: FormControl<string>
  viewControl!:FormControl<string>;
  filteredOptions$:BehaviorSubject<TOption[]> = new BehaviorSubject<TOption[]>(OPTIONS)
  private valueChangesSub: Subscription | undefined = undefined

  constructor(private fb: UntypedFormBuilder) {

  }

  ngOnInit() {
    //sync original with view control
    this.viewControl = this.fb.nonNullable.control(this.control.value, this.control.validator)
    //resets touched listener
    this.control.markAsTouched = () =>{
      this.viewControl.markAsTouched()
    }
    this.setupValueChange()
  }

  ngOnDestroy() {
    if(this.valueChangesSub instanceof  Subscription){
      this.valueChangesSub.unsubscribe()
    }
  }
  /*
    If user did not set a value on select it is reset to previous value
   */

  onTouched(){
    this.viewControl.markAsTouched();
    console.log(this.control.value);
  }

  /*
    Patches the original control value on select
   */
  onSelected(){
    this.control.setValue(this.viewControl.value)
  }

  /*
    Used exclusively for serializing an id to a displayName
   */

  displayFn(value:string){
    if(!this.isValidJson(value)) return ''
    const id = (this.parseId(value) as Array<number>)[0]
    const option = OPTIONS.find(option => option.id === id)
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

  /*
    Used for filtering logic and other view related events
   */
  setupValueChange(){
    if(this.valueChangesSub instanceof Subscription) return;
    this.valueChangesSub = this.viewControl.valueChanges.subscribe(value => {
      const options = OPTIONS.filter(option => option.optionValue.includes(value))
      this.filteredOptions$.next(options)
    })
  }
}
