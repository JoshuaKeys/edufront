import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
// import { OptionComponent } from './option/option.component';

import { OptionModule } from '../option/option.module';
import { FormsModule } from '@angular/forms';
import { OptionValueDirective } from './option-value.directive';

@NgModule({
  declarations: [SelectComponent, OptionValueDirective],
  imports: [CommonModule, FormsModule, OptionModule],
  exports: [[SelectComponent, OptionValueDirective, OptionModule]]
})
export class SelectModule {}
