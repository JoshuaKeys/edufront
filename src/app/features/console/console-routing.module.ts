import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { Console } from 'console';
import { ConsoleShellComponent } from './containers/console-shell/console-shell.component';
import { routeToComponentGenerator } from 'src/app/shared/utilities/route-to-component-generator';
import { consoleRouteToComponentMap, consoleNavigation } from './route-config/route-config';

const routes: Routes = [{
  path: '',
  component: ConsoleShellComponent,
  children: routeToComponentGenerator(consoleRouteToComponentMap, consoleNavigation)
}];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule { }
