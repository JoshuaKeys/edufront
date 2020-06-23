import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidatorDirective } from './validator.directive';

@NgModule({
  declarations: [ValidatorDirective],
  imports: [CommonModule],
  exports: [ValidatorDirective]
})
export class ValidatorModule {}
