import { Directive, Input, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  //   @HostBinding('class') class: string = '';
  @HostBinding('class.open') isOpen: boolean = false;
  constructor() {}

  @HostListener('click') click(eventData: Event) {
    this.isOpen = !this.isOpen;
    // if (this.class === '') this.class = 'open';
    // else this.class = '';
  }
}
