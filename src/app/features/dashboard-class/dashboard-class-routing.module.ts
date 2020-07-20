import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as html from './html';

const dahsboardClassRoutes: Routes = [
  {
    path: 'screen1',
    component: html.Screen1Component
  },
  {
    path: 'screen11',
    component: html.Screen11Component
  },
  {
    path: 'screen13',
    component: html.Screen13Component
  },
  {
    path: 'screen14',
    component: html.Screen14Component
  },
  {
    path: 'screen15',
    component: html.Screen15Component
  },
  {
    path: 'screen17',
    component: html.Screen17Component
  },
  {
    path: 'screen20',
    component: html.Screen20Component
  }
];

@NgModule({
  imports: [RouterModule.forChild(dahsboardClassRoutes)],
  exports: [RouterModule]
})
export class DashboardClassRoutingModule {}
