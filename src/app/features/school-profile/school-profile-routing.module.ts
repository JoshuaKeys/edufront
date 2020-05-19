import { routeToComponentMap } from './config/nav-rules';
import { ShellComponent } from './containers/shell/shell.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import * as fromContainers from './containers';
import { routeToComponentGenerator } from './config/utilities';


const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'browse',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: ShellComponent,
    children: routeToComponentGenerator(),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolProfileRoutingModule { }
