import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as html from './html';

const dashboardCalendarRoutes: Routes = [
  {
    path: 'screen52',
    component: html.Screen52Component
  },
  {
    path: 'screen69',
    component: html.Screen69Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardCalendarRoutes)],
  exports: [RouterModule]
})
export class DashboardCalendarRoutingModule {}
