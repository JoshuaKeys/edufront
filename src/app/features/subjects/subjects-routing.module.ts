import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubjectsShellComponent } from './containers';
import { routeToComponentMap, navigation } from './route-config/route-config';
import { routeToComponentGenerator } from './route-config/utilities';
import { SubjectResolver } from './resolvers/subject.resolver';

const subjectsRoutes: Routes = [{
  path: '',
  resolve: {
    subjects: SubjectResolver
  },
  component: SubjectsShellComponent,
  children: routeToComponentGenerator(routeToComponentMap, navigation),
}]

@NgModule({
  imports: [RouterModule.forChild(subjectsRoutes)],
  exports: [RouterModule]
})
export class SubjectsRoutingModule {

}
