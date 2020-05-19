import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatepickerTestComponent } from './datepicker-test/datepicker-test.component';


const routes: Routes = [
  {
    path: '',
    component: DatepickerTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class uiTestRoutingModule { }