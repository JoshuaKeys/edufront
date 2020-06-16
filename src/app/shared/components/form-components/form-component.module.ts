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
import { ValidatorDirective } from './validator/validator.directive';
let components = [
  InputComponent,
  InputAffixDirective,
  CheckboxComponent,
  ImgUploadComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    SelectModule,
    FormsModule,
    ValidatorModule,
    datePickerModule
  ],
  exports: [...components, SelectModule, datePickerModule, ValidatorModule]
})
export class FormComponentsModule {}
