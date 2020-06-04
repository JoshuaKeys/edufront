import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatepickerTestComponent } from './datepicker-test/datepicker-test.component';
import { SelectTestComponent } from './select-test/select-test.component';
import { InputTestComponent } from './input-test/input-test.component';
import { TimeTableTestComponent } from './timetable-test/timetable-test.component';
import { PopoverTestComponent } from './popover-test/popover-test.component';
import { ImgTestComponent } from './img-test/img-test.component';
const routes: Routes = [
  {
    path: 'date',
    component: DatepickerTestComponent
  },
  {
    path: 'img-upload',
    component: ImgTestComponent
  },
  {
    path: 'popover',
    component: PopoverTestComponent
  },
  {
    path: 'timetable',
    component: TimeTableTestComponent
  },
  {
    path: 'select',
    component: SelectTestComponent
  },
  {
    path: 'input',
    component: InputTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class uiTestRoutingModule {}
