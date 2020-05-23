import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableComponent } from "./timetable/timetable.component"
// import { TimetablePeriodComponent } from "./timetable-period/timetable-period.component"



@NgModule({
  declarations: [TimetableComponent ],
  imports: [
    CommonModule
  ],
  exports:[
    TimetableComponent,
    // TimetablePeriodComponent // not in use for now
  ]
})
export class TimetableModule { }
