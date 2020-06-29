import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SelectModule } from './select/select.module';

// import { datePickerModule } from '../datepicker/datepicker.module';

import { InputComponent } from './input/input.component';
import { InputAffixDirective } from './input/directives/input-affix.directive';
import { TickButtonModule } from './tick-button/tick-button.module';
import { IconSelectModule } from './icon-select/icon-select.module';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ImgUploadComponent } from './img-upload/img-upload.component';
import { ValidatorModule } from './validator/validator.module';
import { datePickerModule } from './datepicker/datepicker.module';
import { Datepicker2Module } from './datepicker2/datepicker2.module';
import { TooltipComponent } from './tooltip/tooltip.component';
import { PhonePrefixComponent } from './phone-prefix/phone-prefix.component';
import { PopoverModule } from './popover/popover.module';
import { TimepickerModule } from './timepicker/timepicker.module';
// import { PopoverComponent } from './popover/popover.component';
// import { PopoverOptionDirective } from './popover/popover-option.directive';
let components = [
  // TickButtonComponent,
  // PopoverComponent,
  // PopoverOptionDirective,
  PhonePrefixComponent,
  InputComponent,
  InputAffixDirective,
  CheckboxComponent,
  ImgUploadComponent,
  TooltipComponent
];

let customModules = [
  TimepickerModule,
  TickButtonModule,
  SelectModule,
  IconSelectModule,
  ValidatorModule,
  datePickerModule,
  Datepicker2Module,
  PopoverModule
];

Datepicker2Module;
@NgModule({
  declarations: [...components],
  imports: [CommonModule, FormsModule, ...customModules],
  exports: [...components, ...customModules]
})
export class FormComponentsModule {}
