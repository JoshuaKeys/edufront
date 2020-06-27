import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverOptionDirective } from './popover-option.directive';
import { PopoverComponent } from './popover.component';

@NgModule({
  declarations: [PopoverOptionDirective, PopoverComponent],
  imports: [CommonModule],
  exports: [PopoverOptionDirective, PopoverComponent]
})
export class PopoverModule {}
