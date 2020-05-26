import { Directive, HostListener , Output, EventEmitter,  Input, OnChanges} from '@angular/core';
import { TimetableService } from "./timetable.service"


@Directive({
  selector: '[contentOnChange]'
})
export class ContentOnChangeDirective   {

  constructor(private timetableService:TimetableService) { }
  @Input("contentOnChange") key; 
  // @Output("onChange") onChange = new EventEmitter();

  // @HostListener("click") onClick(){
  //   // console.log("click dir - " + this.key);
  // }

  @HostListener("onChange" , ["$event"]) onChangeFn(value){
    console.log("onChange dir" + this.key + ", " + value);
    this.timetableService.updateModel(this.key, value)
  }

 
}
