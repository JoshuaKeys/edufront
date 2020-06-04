import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[PopoverOption]'
})
export class PopoverOptionDirective {

  constructor() { }

  @Output("closePopover") closePopover = new EventEmitter();

  @HostListener("close") onClose(){
    console.log("close on dir")
  }


}
