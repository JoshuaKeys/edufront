import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ConsoleShellComponent } from './containers/console-shell/console-shell.component';
import { routeToComponentGenerator } from 'src/app/shared/utilities/route-to-component-generator';
import { consoleRouteToComponentMap, consoleNavigation } from './route-config/route-config';
import { ClassesShellComponent } from './containers/classes-shell/classes-shell.component';
import { ConsoleClassesAndGroupsComponent } from './containers';
import { ConsoleSectionsComponent } from './containers/console-sections/console-sections.component';
import { ConsoleSubjectsComponent } from './containers/console-subjects/console-subjects.component';

const routes: Routes = [{
  path: '',
  component: ConsoleShellComponent,
  children: [
    {
      path: 'classes',
      component: ClassesShellComponent,
      children: [
        {
          path: 'classes-and-groups',
          component: ConsoleClassesAndGroupsComponent
        },
        {
          path: 'sections',
          component: ConsoleSectionsComponent
        },
        {
          path: 'subjects',
          component: ConsoleSubjectsComponent
        }
      ]
    }
  ]
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule { }
