import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { DatepickerComponent } from './datepicker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DatepickerComponent],
  imports: [
 
    ReactiveFormsModule, 
    FormsModule, 
    AngularMyDatePickerModule,
    CommonModule
  ],


  exports:[DatepickerComponent]
})
export class datePickerModule { }
