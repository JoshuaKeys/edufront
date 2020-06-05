import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepickerTestComponent } from './datepicker-test/datepicker-test.component';
import { SelectTestComponent } from './select-test/select-test.component';
import { uiTestRoutingModule } from './ui-test-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TimeTableTestComponent } from './timetable-test/timetable-test.component';
import { CbComponent } from './timetable-test/cb/cb.component';
import { InputTestComponent } from './input-test/input-test.component';
import { CbTestComponent } from './input-test/cb-test/cb-test.component'; // test component used in input test
import { InputPrefixTestComponent } from './input-test/input-prefix-test/input-prefix-test.component';
import { PopoverTestComponent } from './popover-test/popover-test.component';
import { ImgTestComponent } from './img-test/img-test.component';
const components = [
  ImgTestComponent,
  DatepickerTestComponent,
  SelectTestComponent,
  TimeTableTestComponent,
  InputTestComponent,
  CbComponent,
  CbTestComponent,
  InputPrefixTestComponent,
  PopoverTestComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    uiTestRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class uiTestModule {}
