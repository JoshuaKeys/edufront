import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { RadialProgressComponent } from './radial-progress/radial-progress.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';

let components = [DashboardComponent, RadialProgressComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, DashboardRoutingModule, SharedModule]
})
export class DashboardModule { }
