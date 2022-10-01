import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompoundComponentsComponent } from './compound-components.component';

describe('CompoundComponentsComponent', () => {
  let component: CompoundComponentsComponent;
  let fixture: ComponentFixture<CompoundComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompoundComponentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompoundComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
