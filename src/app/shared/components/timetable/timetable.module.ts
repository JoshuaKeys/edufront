import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableComponent } from "./timetable/timetable.component";
import { ContentOnChangeDirective } from './content-on-change.directive';
import { TimetableService } from "./timetable.service"
// import { TimetablePeriodComponent } from "./timetable-period/timetable-period.component"

import {  FormsModule  } from "@angular/forms"

@NgModule({
  declarations: [TimetableComponent, ContentOnChangeDirective ],
  providers : [TimetableService],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    TimetableComponent,
    ContentOnChangeDirective
    
    // TimetablePeriodComponent // not in use for now
  ]
})
export class TimetableModule { }
