import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';
import { routeToComponentGenerator } from './route-config/utilities';
import { navigation, routeToComponentMap } from './route-config/route-config';
import { ClassesAndGroupsShellComponent } from './containers';
import { AuthenticatedGuard } from 'src/app/guards/authenticated/authenticated-guard';

const classesAndGroupRoutes: Routes = [{
  path: 'classes-in-school',
  component: ClassesAndGroupsShellComponent,
  children: routeToComponentGenerator(routeToComponentMap, navigation),
}, {
  path: '',
  redirectTo: '/classes-and-groups/classes-in-school',
  pathMatch: 'full'
}]

@NgModule({
  imports: [
    RouterModule.forChild(classesAndGroupRoutes)
  ],
  exports: [RouterModule],
})
export class ClassesAndGroupsRoutingModule {

}
