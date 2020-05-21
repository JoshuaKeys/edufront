import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from "./select/select.component";
import { OptionComponent } from "./option/option.component"
import { FormsModule } from "@angular/forms";
import { OptionValueDirective } from './option-value.directive'

@NgModule({
  declarations: [SelectComponent, OptionComponent, OptionValueDirective],
  imports: [
    CommonModule,FormsModule
  ],
  exports:[[SelectComponent, OptionComponent, OptionValueDirective]]
})
export class SelectModule { }
