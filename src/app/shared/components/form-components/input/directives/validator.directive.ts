import { Directive, Input, OnInit , EventEmitter, OnDestroy, Output} from '@angular/core';
import { InputService } from "../input.service"

@Directive({
  selector: '[Validator]'
})
export class ValidatorDirective implements OnInit , OnDestroy{
  constructor(private inputService:InputService){
    
  }
 
  //possible values are [] right,bottom,left, bottom-flow ] 
  //bottom-flow is for validator to be bottom but be part of the flow and not absolutely positioned
  @Input("alignment") alignment = "right"; // default will be right

  ngOnInit(){
    this.inputService.inputHasError.next(true);
    this.inputService.validatorPosition.next(this.alignment);
    // console.log("oninit")
  }
  ngOnDestroy(){
    this.inputService.inputHasError.next(false)
    // console.log("destroy")
  }



}
