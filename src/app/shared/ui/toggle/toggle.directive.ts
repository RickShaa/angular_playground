import { EventEmitter } from '@angular/core';
import { Directive, Input, Output } from '@angular/core';
@Directive({
  exportAs: 'toggle',
  selector: 'toggle, [toggle]',
})
export class ToggleDirective {
  @Input() on?: boolean;
  @Output() toggleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  setOnState(state: boolean) {
    this.on = state;
    this.toggleChange.emit(this.on);
  }
}
