import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IconSelectModule } from './icon-select/icon-select.module';
import { SelectModule } from './select/select.module';

// import { datePickerModule } from '../datepicker/datepicker.module';

import { InputComponent } from './input/input.component';
import { InputAffixDirective } from './input/directives/input-affix.directive';
import { ValidatorDirective } from './input/directives/validator.directive';
import { TickButtonComponent } from './tick-button/tick-button.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ImgUploadComponent } from './img-upload/img-upload.component';
let components = [
  TickButtonComponent,
  InputComponent,
  InputAffixDirective,
  CheckboxComponent,
  ValidatorDirective,
  ImgUploadComponent
];

@NgModule({
  declarations: [...components],
  imports: [SelectModule, FormsModule, CommonModule, IconSelectModule],
  exports: [...components, SelectModule, IconSelectModule]
})
export class FormComponentsModule {}
