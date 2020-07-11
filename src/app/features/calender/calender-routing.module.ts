import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalenderShellComponent } from './containers/calender-shell/calender-shell.component';
import { routeToComponentGenerator } from 'src/app/shared/utilities/route-to-component-generator';
import { calenderRouteToComponentMap, calenderNavigation } from './route-config';
import { CalendarConfirmationComponent } from './containers';
const calenderRoutes: Routes = [
  {
    path: 'calendar-confirmation',
    component: CalendarConfirmationComponent,
    data: {
      next: 'update-timetable'
    }
  },
  {
    path: '',
    component: CalenderShellComponent,
    children: routeToComponentGenerator(calenderRouteToComponentMap, calenderNavigation)
  }]

@NgModule({
  imports: [RouterModule.forChild(calenderRoutes)],
  exports: [RouterModule]
})
export class CalenderRoutingModule { }
