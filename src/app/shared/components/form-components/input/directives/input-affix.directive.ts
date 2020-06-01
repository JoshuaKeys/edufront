import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[InputAffix]'
})
export class InputAffixDirective {

  constructor() { }
  @Input("InputAffix") config ;
  @Output("setConfig2") setConfig = new EventEmitter();

  // @HostListener("click") onclick(){
  //   this.setConfig.emit({key:"isPassword",value:true});
  // }

  @HostListener("setConfig", ["$event"]) onSetConfig(param){
    console.log("dir - " + JSON.stringify(param))
    this.setConfig.emit(param);
  }

 

}
