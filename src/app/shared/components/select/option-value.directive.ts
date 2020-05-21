import { Directive , Input, ElementRef, Renderer2, HostListener, Output,EventEmitter, AfterContentInit} from '@angular/core';

@Directive({
  selector: '[OptionValue]'
})
export class OptionValueDirective {
  @Input() OptionValue: any;
  @Output() valueChange = new EventEmitter()
  constructor(  ) { 
  }
 
 

  @HostListener('click') onClick() {
    // console.log("clicked at directive level - " + this.OptionValue);
    this.valueChange.emit(this.OptionValue);

  }

}
