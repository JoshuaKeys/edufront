import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { DatepickerTestComponent } from "./datepicker-test/datepicker-test.component"
import { uiTestRoutingModule } from './ui-test-routing.module';
import { SharedModule } from '../../shared/shared.module';

const components = [
  DatepickerTestComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    uiTestRoutingModule,
    SharedModule,
 
  ]
})
export class uiTestModule { }
