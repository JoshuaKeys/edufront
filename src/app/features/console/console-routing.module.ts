import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { ConsoleShellComponent } from './containers/console-shell/console-shell.component';
import { routeToComponentGenerator } from 'src/app/shared/utilities/route-to-component-generator';
// import {
//   consoleRouteToComponentMap,
//   consoleNavigation
// } from './route-config/route-config';
// import { ClassesShellComponent } from './containers/classes-shell/classes-shell.component';
// import { ConsoleClassesAndGroupsComponent } from './containers';
// import { ConsoleSectionsComponent } from './containers/console-sections/console-sections.component';
// import { ConsoleSubjectsComponent } from './containers/console-subjects/console-subjects.component';
// import { ConsoleSectionEditComponent } from './containers/console-section-edit/console-section-edit.component';
// import { ConsoleSectionViewComponent } from './containers/console-section-view/console-section-view.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./modules/console-admin/console-admin.module').then(m => m.ConsoleAdminModule)
  },
  {
    path: '',
    redirectTo: '/console/admin/classes/classes-and-groups'
  }

  // {
  //   path: '',
  //   component: ConsoleShellComponent,
  //   children: [
  //     // {
  //     //   path: 'classes',
  //     //   component: ClassesShellComponent,
  //     //   children: [
  //     //     {
  //     //       path: 'classes-and-groups',
  //     //       component: ConsoleClassesAndGroupsComponent
  //     //     },
  //     //     {
  //     //       path: 'sections',
  //     //       component: ConsoleSectionsComponent,
  //     //       children: [
  //     //         {
  //     //           path: 'sections-view',
  //     //           component: ConsoleSectionViewComponent
  //     //         },
  //     //         {
  //     //           path: 'sections-edit',
  //     //           component: ConsoleSectionEditComponent
  //     //         },
  //     //         {
  //     //           path: '',
  //     //           redirectTo: 'sections-view',
  //     //           pathMatch: 'full'
  //     //         }
  //     //       ]
  //     //     },
  //     //     {
  //     //       path: 'subjects',
  //     //       component: ConsoleSubjectsComponent
  //     //     }
  //     //   ]
  //     // },

  //
  //   ]
  // }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleRoutingModule { }
