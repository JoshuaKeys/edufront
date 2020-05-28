import { NgModule, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import {SelectModule} from "./select/select.module"

import { InputComponent } from "./input/input.component";
import { InputAffixDirective } from './input/input-affix.directive'

let components = [InputComponent, InputAffixDirective]

@NgModule({
  declarations: [...components],
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
