import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsoleShellComponent } from './containers/console-shell/console-shell.component';
import { ClassesShellComponent } from './containers/classes-shell/classes-shell.component';
import { ConsoleClassesAndGroupsComponent } from './containers';
import { ConsoleSectionsComponent } from './containers/console-sections/console-sections.component';
import { ConsoleSubjectsComponent } from './containers/console-subjects/console-subjects.component';
import { ConsoleSectionEditComponent } from './containers/console-section-edit/console-section-edit.component';
import { ConsoleSectionViewComponent } from './containers/console-section-view/console-section-view.component';
import { SubjectWeightsComponent } from './containers/subject-weights/subject-weights.component';

const routes: Routes = [
  {
    path: '',
    component: ConsoleShellComponent,
    children: [
      {
        path: 'classes',
        component: ClassesShellComponent,
        children: [
          {
            path: 'classes-and-groups',
            component: ConsoleClassesAndGroupsComponent
          },
          {
            path: 'sections',
            component: ConsoleSectionsComponent,
            children: [
              {
                path: 'sections-view',
                component: ConsoleSectionViewComponent
              },
              {
                path: 'sections-edit',
                component: ConsoleSectionEditComponent
              },
              {
                path: '',
                redirectTo: 'sections-view',
                pathMatch: 'full'
              }
            ]
          },
          {
            path: 'subjects',
            component: ConsoleSubjectsComponent
          },
          {
            path: 'subject-weights',
            component: SubjectWeightsComponent
          },
          {
            path: '',
            redirectTo: '/console/admin/classes/classes-and-groups',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./../../calendar/calendar.module').then(m => m.CalendarModule)
      },
      {
        path: '',
        redirectTo: '/console/admin/classes/classes-and-groups',
        pathMatch: 'full'
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsoleAdminRoutingModule {}
