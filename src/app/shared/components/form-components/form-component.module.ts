import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectModule } from './select/select.module';

// import { datePickerModule } from '../datepicker/datepicker.module';

import { InputComponent } from './input/input.component';
import { InputAffixDirective } from './input/directives/input-affix.directive';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { ImgUploadComponent } from './img-upload/img-upload.component';
import { ValidatorModule } from './validator/validator.module';
import { datePickerModule } from './datepicker/datepicker.module';
import { Datepicker2Module } from './datepicker2/datepicker2.module';
import { TooltipComponent } from './tooltip/tooltip.component';
import { PhonePrefixComponent } from './phone-prefix/phone-prefix.component';
import { PopoverComponent } from './popover/popover.component';
import { PopoverOptionDirective } from './popover/popover-option.directive';
import { ValidatorDirective } from './validator/validator.directive';
let components = [
  PopoverComponent,
  PopoverOptionDirective,
  PhonePrefixComponent,
  InputComponent,
  InputAffixDirective,
  CheckboxComponent,
  ImgUploadComponent,
  TooltipComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    SelectModule,
    FormsModule,
    ValidatorModule,
    datePickerModule,
    Datepicker2Module
  ],
  exports: [
    ...components,
    SelectModule,
    datePickerModule,
    ValidatorModule,
    Datepicker2Module
  ]
})
export class FormComponentsModule {}
