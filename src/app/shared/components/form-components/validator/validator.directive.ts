import {
  Directive,
  Input,
  OnInit,
  EventEmitter,
  OnDestroy,
  Output
} from '@angular/core';
import { ValidatorService } from './validator.service';

@Directive({
  selector: '[validator]'
})
export class ValidatorDirective implements OnInit, OnDestroy {
  constructor(private validatorService: ValidatorService) {}

  //possible values are [] right,bottom,left, bottom-flow ]
  //bottom-flow is for validator to be bottom but be part of the flow and not absolutely positioned
  @Input('alignment') alignment = 'right'; // default will be right

  ngOnInit() {
    this.validatorService.validatorHasError.next(true);
    this.validatorService.validatorPosition.next(this.alignment);
    // console.log('oninit');
  }
  ngOnDestroy() {
    this.validatorService.validatorHasError.next(false);
    // console.log('destroy');
  }
}
