import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { CreateSectionsShellComponent } from './containers/create-sections-shell/create-sections-shell.component';
import { routeToComponentGenerator } from 'src/app/shared/utilities/route-to-component-generator';
import { routeToComponentMap, navigation } from './route-config/index';
const sectionRoutes: Routes = [{
  path: '',
  component: CreateSectionsShellComponent,
  children: routeToComponentGenerator(routeToComponentMap, navigation)
}]
@NgModule({
  imports: [
    RouterModule.forChild(sectionRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SectionsRoutingModule { }
