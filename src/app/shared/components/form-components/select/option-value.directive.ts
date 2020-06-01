import { Directive, OnInit,Input, ElementRef, Renderer2, HostListener, Output,EventEmitter, AfterContentInit} from '@angular/core';

@Directive({
  selector: '[OptionValue]'
})
export class OptionValueDirective implements OnInit {
  @Input() OptionValue: any;
  @Output() valueChange = new EventEmitter()
  @Output() initValue = new EventEmitter()
  constructor(  ) { 
  }
 
  ngOnInit(){
    this.initValue.emit(this.OptionValue);
  }
 

  @HostListener('click') onClick() {
    // console.log("clicked at directive level - " + this.OptionValue);
    this.valueChange.emit(this.OptionValue);

  }

}
