import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Datepicker3Component } from './datepicker3.component';
import { BaseDatepickerComponent } from './base-datepicker/base-datepicker.component';
import { RangeDatepickerComponent } from './range-datepicker/range-datepicker.component';
import { DayPipe } from './dayPipe/day-pipe.pipe';
import { FormsModule } from '@angular/forms';
import { TickButtonModule } from '../tick-button/tick-button.module';
import { PopoverModule } from '../popover/popover.module';
@NgModule({
  declarations: [
    Datepicker3Component,
    DayPipe,
    BaseDatepickerComponent,
    RangeDatepickerComponent
  ],
  imports: [CommonModule, FormsModule, TickButtonModule, PopoverModule],
  exports: [
    Datepicker3Component,
    BaseDatepickerComponent,
    RangeDatepickerComponent
  ]
})
export class Datepicker3Module {}
