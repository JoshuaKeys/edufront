import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconSelectComponent } from './icon-select/icon-select.component';
// import { OptionComponent } from './option/option.component';
import { FormsModule } from '@angular/forms';
import { OptionModule } from '../option/option.module';
@NgModule({
  declarations: [IconSelectComponent],
  imports: [CommonModule, FormsModule, OptionModule],
  exports: [[IconSelectComponent, OptionModule]]
})
export class IconSelectModule {}
