import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './containers/shell/shell.component';
import { routeToComponentGenerator } from './config/utilities';


const routes: Routes = [
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
