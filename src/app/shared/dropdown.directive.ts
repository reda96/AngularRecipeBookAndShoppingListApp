import {
  Directive,
  Input,
  HostListener,
  HostBinding,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  //   @HostBinding('class') class: string = '';
  @HostBinding('class.open') isOpen: boolean = false;
  constructor(private elRef: ElementRef) {}

  //   @HostListener('click') click(eventData: Event) {
  //     this.isOpen = !this.isOpen;
  //     // if (this.class === '') this.class = 'open';
  //     // else this.class = '';
  //   }
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
}
