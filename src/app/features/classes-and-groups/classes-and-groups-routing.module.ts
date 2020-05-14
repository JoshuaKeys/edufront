import { NgModule } from '@angular/core';


import { RouterModule, Routes } from '@angular/router';
import { routeToComponentGenerator } from './route-config/utilities';
import { navigation, routeToComponentMap } from './route-config/route-config';
import { ClassesAndGroupsShellComponent } from './containers';
import { AuthenticatedGuard } from 'src/app/guards/authenticated/authenticated-guard';

const classesAndGroupRoutes: Routes = [{
  path: '',
  canActivate: [AuthenticatedGuard],
  component: ClassesAndGroupsShellComponent,
  children: routeToComponentGenerator(routeToComponentMap, navigation),
}]

@NgModule({
  imports: [
    RouterModule.forChild(classesAndGroupRoutes)
  ],
  exports: [RouterModule],
  providers: [
    AuthenticatedGuard
  ]
})
export class ClassesAndGroupsRoutingModule {

}
