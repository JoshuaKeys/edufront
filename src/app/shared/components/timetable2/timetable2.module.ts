import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableComponent2 } from './timetable2.component';
import { ContentOnChangeDirective2 } from './content-on-change2.directive';
import { TimetableService2 } from './timetable2.service';
// import { TimetablePeriodComponent } from "./timetable-period/timetable-period.component"

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TimetableComponent2, ContentOnChangeDirective2],
  providers: [TimetableService2],
  imports: [CommonModule, FormsModule],
  exports: [
    TimetableComponent2,
    ContentOnChangeDirective2

    // TimetablePeriodComponent // not in use for now
  ]
})
export class TimetableModule2 {}
