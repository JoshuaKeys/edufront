import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent2 } from './select/select.component';
import { OptionComponent2 } from './option/option.component';

// import { OptionModule } from '../option/option.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectComponent2, OptionComponent2],
  imports: [CommonModule, FormsModule],
  exports: [[SelectComponent2, OptionComponent2]]
})
export class SelectModuleV2 {}
