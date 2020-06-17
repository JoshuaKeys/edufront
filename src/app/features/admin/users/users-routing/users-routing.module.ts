import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersShellComponent } from '../containers/users-shell/users-shell.component';
import { StudentsTabComponent } from '../components/students-tab/students-tab.component';

import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: UsersShellComponent,
    children: [
      {
        path: 'students',
        component: StudentsTabComponent
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
