import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatepickerTestComponent } from './datepicker-test/datepicker-test.component';
import { SelectTestComponent } from "./select-test/select-test.component" 
import { TimeTableTestComponent } from "./timetable-test/timetable-test.component" 

const routes: Routes = [
  {
    path: 'date',
    component: DatepickerTestComponent
  },
  {
    path: 'timetable',
    component: TimeTableTestComponent
  },
  {
    path: 'select',
    component: SelectTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class uiTestRoutingModule { }