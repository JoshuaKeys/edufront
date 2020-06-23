import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMyDatePickerModule } from 'angular-mydatepicker';
import { Datepicker2Component } from './datepicker2.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorModule } from '../validator/validator.module';
@NgModule({
  declarations: [Datepicker2Component],
  imports: [
    ValidatorModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMyDatePickerModule,
    CommonModule
  ],
  exports: [Datepicker2Component]
})
export class Datepicker2Module {
  Datepicker2Component;
}
