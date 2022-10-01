import {
  Directive,
  Host,
  Input,
  OnChanges,
  Optional,
  SimpleChanges,
} from '@angular/core';
import { ToggleDirective } from './toggle.directive';
@Directive({
  /*ToggleProvider has same selector as toggleDirective
    therefore toggleDirective and ToggleProiderDirective will be instantiated
    first we need to inject it in to the Constructor
    But only the one that is on the exact same element @Host()

    By giving it its own selector [toggleProvider]
    we can specify which toggleDirective to use, (shared directive and therefore state)
    -> @Input() toggleProvider

    If we use [toggleProvider] to reference toggleProvider
    we do not have a toggleDirective on the Host element
    -> @Optional()
    */
  exportAs: 'toggleProvider',
  selector: 'toggle, [toggle], [toggleProvider]',
})
export class ToggleProviderDirective implements OnChanges {
  @Input() toggleProvider!: ToggleDirective;
  toggle: ToggleDirective = this.toggleDirective;
  constructor(@Host() @Optional() private toggleDirective: ToggleDirective) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { toggleProvider } = changes;
    if (toggleProvider) {
      this.toggle = this.toggleProvider || this.toggleDirective;
    }
  }
}
