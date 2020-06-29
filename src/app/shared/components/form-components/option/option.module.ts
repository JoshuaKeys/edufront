import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionValueDirective } from './option-value.directive';
import { OptionComponent } from './option.component';
@NgModule({
  declarations: [OptionComponent, OptionValueDirective],
  imports: [CommonModule],
  exports: [OptionComponent, OptionValueDirective]
})
export class OptionModule {}
