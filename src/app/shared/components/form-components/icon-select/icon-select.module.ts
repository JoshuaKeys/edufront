import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconSelectComponent } from './icon-select/icon-select.component';
// import { OptionComponent } from './option/option.component';
import { FormsModule } from '@angular/forms';
// import { OptionModule } from '../option/option.module';
import { PopoverModule } from '../popover/popover.module';
import { TickButtonModule } from '../tick-button/tick-button.module';

let requiredModules = [PopoverModule, TickButtonModule];
@NgModule({
  declarations: [IconSelectComponent],
  imports: [CommonModule, FormsModule, ...requiredModules],
  exports: [[IconSelectComponent]]
})
export class IconSelectModule {}
