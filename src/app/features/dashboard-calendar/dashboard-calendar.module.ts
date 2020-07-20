import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { htmlComponents } from './html';
import { DashboardCalendarRoutingModule } from './dashboard-calendar-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  declarations: [...htmlComponents],
  imports: [CommonModule, DashboardCalendarRoutingModule, SharedModule]
})
export class DashboardCalendarModule {}
