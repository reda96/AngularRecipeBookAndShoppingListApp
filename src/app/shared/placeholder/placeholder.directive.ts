import { ViewContainerRef, Directive } from '@angular/core';

@Directive({
  selector: '[appPlaceholdor]',
})
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
