import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DatepickerTestComponent } from "./datepicker-test/datepicker-test.component";
import { SelectTestComponent } from "./select-test/select-test.component"
import { uiTestRoutingModule } from './ui-test-routing.module';
import { SharedModule } from '../../shared/shared.module';

const components = [
  DatepickerTestComponent,
  SelectTestComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    uiTestRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
 
  ]
})
export class uiTestModule { }
