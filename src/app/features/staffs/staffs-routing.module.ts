import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaffsShellComponent } from './containers';
import { routeToComponentGenerator } from 'src/app/shared/utilities/route-to-component-generator';
import { routeToComponentMap, navigation } from './route-config/route-config';


const routes: Routes = [{
  path: '',
  component: StaffsShellComponent,
  children: routeToComponentGenerator(routeToComponentMap, navigation)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffsRoutingModule {
}
