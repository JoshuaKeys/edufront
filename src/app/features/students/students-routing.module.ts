import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsShellComponent } from './containers/students-shell/students-shell.component';
import { routeToComponentGenerator } from 'src/app/shared/utilities/route-to-component-generator';
import { routeToComponentMap, navigation } from './route-config';

const studentsRoutes: Routes = [{
  path: '',
  component: StudentsShellComponent,
  children: routeToComponentGenerator(routeToComponentMap, navigation)
}]
@NgModule({
  imports: [RouterModule.forChild(studentsRoutes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
