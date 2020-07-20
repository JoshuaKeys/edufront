import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { htmlComponents } from './html';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardClassRoutingModule } from './dashboard-class-routing.module';
@NgModule({
  declarations: [htmlComponents],
  imports: [CommonModule, DashboardClassRoutingModule, SharedModule]
})
export class DashboardClassModule {}
