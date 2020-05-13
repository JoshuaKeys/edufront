import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';
import { routeToComponentGenerator } from './route-config/utilities';
import { navigation, routeToComponentMap } from './route-config/route-config';
import { ClassesAndGroupsShellComponent } from './containers';

const classesAndGroupRoutes: Routes = [{
  path: '',
  component: ClassesAndGroupsShellComponent,
  children: routeToComponentGenerator(routeToComponentMap, navigation),
}]

@NgModule({
  imports: [
    RouterModule.forChild(classesAndGroupRoutes)
  ],
  exports: [RouterModule]
})
export class ClassesAndGroupsRoutingModule {

}
