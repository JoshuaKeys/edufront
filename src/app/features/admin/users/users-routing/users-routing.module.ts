import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersShellComponent } from '../containers/users-shell/users-shell.component';
import { StudentsTabComponent } from '../components/students-tab/students-tab.component';

import { Routes, RouterModule } from '@angular/router';
import { TeachersTabComponent } from '../components/teachers-tab/teachers-tab.component';
import { AdministratorsTabComponent } from '../components/administrators-tab/administrators-tab.component';
const routes: Routes = [
  {
    path: '',
    component: UsersShellComponent,

    children: [
      {
        path: 'students',
        component: StudentsTabComponent
      },
      {
        path: 'teachers',
        component: TeachersTabComponent
      },

      {
        path: 'administrators',
        component: AdministratorsTabComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
