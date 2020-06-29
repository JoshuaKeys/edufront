import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimepickerComponent } from './timepicker.component';

import { PopoverModule } from '../popover/popover.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TimepickerComponent],
  imports: [CommonModule, FormsModule, PopoverModule],
  exports: [TimepickerComponent]
})
export class TimepickerModule {}
