import { NgModule } from '@angular/core';
import { ClassesAndGroupComponent } from './containers';

import { RouterModule, Routes } from '@angular/router';
import { routeToComponentGenerator } from './route-config/utilities';

const classesAndGroupRoutes: Routes = [{
  path: '',
  component: ClassesAndGroupComponent,
  children: routeToComponentGenerator(),
}]

@NgModule({
  imports: [
    RouterModule.forChild(classesAndGroupRoutes)
  ],
  exports: [RouterModule]
})
export class ClassesAndGroupsRoutingModule {

}
