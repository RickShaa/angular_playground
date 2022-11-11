import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMessengerComponent } from './form-messenger.component';

describe('FormMessengerComponent', () => {
  let component: FormMessengerComponent;
  let fixture: ComponentFixture<FormMessengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMessengerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
