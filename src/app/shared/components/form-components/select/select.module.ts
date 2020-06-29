import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from './select/select.component';
import { OptionComponent } from './option/option.component';

// import { OptionModule } from '../option/option.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SelectComponent, OptionComponent],
  imports: [CommonModule, FormsModule],
  exports: [[SelectComponent, OptionComponent]]
})
export class SelectModule {}
