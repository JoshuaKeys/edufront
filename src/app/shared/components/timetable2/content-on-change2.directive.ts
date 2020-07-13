import {
  Directive,
  HostListener,
  Output,
  EventEmitter,
  Input,
  OnChanges
} from '@angular/core';
import { TimetableService2 } from './timetable2.service';

@Directive({
  selector: '[TimetableKey2]'
})
export class ContentOnChangeDirective2 {
  constructor(private timetableService: TimetableService2) {}
  @Input('TimetableKey') key;
  // @Output("onChange") onChange = new EventEmitter();

  // @HostListener("click") onClick(){
  //   // console.log("click dir - " + this.key);
  // }

  @HostListener('valueChange', ['$event']) onValueChange(value) {
    // console.log('valueChange dir' + this.key + ', ' + value);
    this.timetableService.updateModel(this.key, value);
  }
}
