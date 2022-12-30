import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { debounceTime, filter, from, Subscription, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-form-messenger',
  templateUrl: './form-messenger.component.html',
  styleUrls: ['./form-messenger.component.sass'],
})
export class FormMessengerComponent implements OnInit, OnDestroy {
  fields = [
    {
      id: 2,
      val: 'Control Group',
      readonly: false,
    },
    {
      id: 5,
      val: '',
      readonly: false,
    },
  ];

  readOnlyField = [
    {
      id: 5,
      val: '',
      readonly: true,
    },
    {
      id: 2,
      val: 'Control Group',
      readonly: true,
    },
  ];
  receiverControls: {
    id: string;
    control: UntypedFormControl;
  }[] = [];
  senderSubs: Subscription[] = [];
  formGroup = this.fb.group({});
  readOnlyGroup = this.fb.group({});
  constructor(private fb: UntypedFormBuilder) {}

  ngOnDestroy(): void {
    this.senderSubs.forEach((sub) => {
      sub.unsubscribe();
    });
  }
  ngOnInit(): void {
    this.fields.forEach((field) => {
      const readOnly = field.readonly;
      const idAsString = field.id.toString();
      const value = field.val;
      const control = this.fb.control(
        {
          value: value,
          disabled: readOnly,
        },
        Validators.required
      );
      //save subscriptions so component can unsubscribe onDestroy
      this.senderSubs.push(
        control.valueChanges
          .pipe(
            debounceTime(800),
            switchMap((val) => {
              return from(this.receiverControls).pipe(
                filter((receiver) => receiver.id === idAsString),
                tap((receiver) => {
                  receiver.control.patchValue(val);
                })
              );
            })
          )
          .subscribe()
      );
      this.formGroup.addControl(idAsString, control);
    });
    this.readOnlyField.forEach((field) => {
      const readOnly = field.readonly;
      const idAsString = field.id.toString();
      const value = field.val;
      const control = this.fb.control(
        {
          value: value,
          disabled: readOnly,
        },
        Validators.required
      );
      this.receiverControls.push({
        id: idAsString,
        control: control,
      });
      this.readOnlyGroup.addControl(idAsString, control);
    });
  }

  /*notify(id: string, changedValue: string) {
    this.receiverControls.forEach((receiver) => {
      console.log('TeSSt');
      if (receiver.id === id) {
        receiver.control.patchValue(changedValue);
      }
    });
  }*/
}
