import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultiPopoverComponent } from './multi-popover.component';
import { ChildIdentifierDirective } from './child-identifier.directive';
@NgModule({
  declarations: [MultiPopoverComponent, ChildIdentifierDirective],
  imports: [CommonModule],
  exports: [MultiPopoverComponent, ChildIdentifierDirective]
})
export class MultiPopoverModule {}
