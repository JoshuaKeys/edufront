import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { RadialProgressComponent } from './radial-progress/radial-progress.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { dashboardReducer } from './ngrx/reducers';

let components = [DashboardComponent, RadialProgressComponent];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    StoreModule.forFeature('dashboard', dashboardReducer)
  ]
})
export class DashboardModule { }
