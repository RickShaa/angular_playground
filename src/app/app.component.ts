import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";

type FieldType = "number" | "dropdown" | "people-picker"
const fields:
  {id:number,readonly:boolean,required:boolean,value:string | null, type:FieldType} []
  = [{id:1,readonly:true,required:false,value:null, type:"number"},
  {id:2,readonly:false,required:true,value:null, type:"dropdown"},
  {id:3,readonly:false,required:true,value:null, type:"people-picker"}
]
@Component({
  selector: 'app-root',
  template:`
    <form [formGroup]="formGroup">
        <app-form-components [control]="getControl('2')">
        </app-form-components>
      <app-form-components [control]="getControl('3')">
      </app-form-components>
  </form>`,
  styleUrls: ['./app.component.sass']
})
export class AppComponent{
  formGroup!:FormGroup
  constructor(private fb:UntypedFormBuilder) {
    let controls:{[key:string]:FormControl} = {};

    fields.forEach(obj =>{
      const {id, readonly,required,value,type} = obj
      controls[this.normalizeControlName(id,readonly)] = this.fb.control(
        this.normalizeState(value,type),
        this.normalizeValidator(required,readonly))
    })
    this.formGroup = this.fb.nonNullable.group(controls)
    this.formGroup.valueChanges.subscribe(console.log)

    setTimeout(()=>{
      this.formGroup.markAllAsTouched()
    }, 2000)
  }

  getControl(name:string){
    return this.formGroup.get(name)! as FormControl<string>
  }

  normalizeState(value:string | null, type:FieldType){
    //go on for all pickers which need its value normalized to ''
    if(type === "people-picker" || type === "dropdown"){
      return value ? value : ''
    }
    return null
  }

  normalizeValidator(required:boolean, readonly:boolean){
    if(readonly) return null
    return required ? Validators.required : null
  }

  normalizeControlName(fieldId:number,readonly:boolean){
    const idString = fieldId.toString();
    return readonly? `${idString}_readonly` : idString
  }
}


