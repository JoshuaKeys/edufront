import {
  Directive,
  HostListener,
  Output,
  EventEmitter,
  Input,
  OnChanges
} from '@angular/core';
import { TimetableService } from './timetable.service';

@Directive({
  selector: '[TimetableKey]'
})
export class ContentOnChangeDirective {
  constructor(private timetableService: TimetableService) {}
  @Input('TimetableKey') key;
  // @Output("onChange") onChange = new EventEmitter();

  // @HostListener("click") onClick(){
  //   // console.log("click dir - " + this.key);
  // }

  @HostListener('valueChange', ['$event']) onValueChange(value) {
    console.log('valueChange dir' + this.key + ', ' + value);
    this.timetableService.updateModel(this.key, value);
  }
}
