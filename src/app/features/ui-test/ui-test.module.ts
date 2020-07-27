import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepickerTestComponent } from './datepicker-test/datepicker-test.component';
import { SelectTestComponent } from './select-test/select-test.component';
import { uiTestRoutingModule } from './ui-test-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TimeTableTestComponent } from './timetable-test/timetable-test.component';
import { TimeTableTestComponent2 } from './timetable-test-2/timetable-test.component';
import { CbComponent } from './timetable-test/cb/cb.component';
// import { SubjectIconFieldComponent } from './input-test/subject-icon-field/subject-icon-field.component';
import { InputTestComponent } from './input-test/input-test.component';
import { CbTestComponent } from './input-test/cb-test/cb-test.component'; // test component used in input test
import { InputPrefixTestComponent } from './input-test/input-prefix-test/input-prefix-test.component';
import { PopoverTestComponent } from './popover-test/popover-test.component';
import { ImgTestComponent } from './img-test/img-test.component';
import { TimepickerTestComponent } from './timepicker-test/timepicker-test.component';
import { SliderTestComponent } from './slider-test/slider-test.component';
import { ModalTestComponent } from './modal-test/modal-test.component';
import { NgmodelTestComponent } from './ngmodel-test/ngmodel-test.component';
import { ModalModule } from './modal/modal.module';
import { SampleDataTestComponent } from './sample-data-test/sample-data-test.component';
import { TestingComponentComponent } from './modal-test/testing-component/testing-component.component';

const components = [
  SampleDataTestComponent,
  TestingComponentComponent,
  NgmodelTestComponent,
  ModalTestComponent,
  TimepickerTestComponent,
  SliderTestComponent,
  TimeTableTestComponent2,
  ImgTestComponent,
  DatepickerTestComponent,
  SelectTestComponent,
  TimeTableTestComponent,
  InputTestComponent,
  CbComponent,
  CbTestComponent,
  InputPrefixTestComponent,
  PopoverTestComponent
  // SubjectIconFieldComponent
];

@NgModule({
  declarations: components,
  imports: [
    ModalModule,
    CommonModule,
    uiTestRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class uiTestModule {}
