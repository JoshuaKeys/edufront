import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import {SelectModule} from "./select/select.module"

import { InputComponent } from "./input/input.component";
import { InputAffixDirective } from './input/directives/input-affix.directive'
import { ValidatorDirective } from './input/directives/validator.directive'

import { CheckboxComponent } from "./checkbox/checkbox.component";
import { ImgUploadComponent } from "./img-upload/img-upload.component";
let components = [InputComponent, InputAffixDirective,CheckboxComponent, ValidatorDirective, ImgUploadComponent];

@NgModule({
  declarations: [...components ],
  imports: [
    SelectModule,
    FormsModule,
    CommonModule
  ],
  exports:[
    ...components,
    SelectModule
  ]
})
export class FormComponentsModule { }
