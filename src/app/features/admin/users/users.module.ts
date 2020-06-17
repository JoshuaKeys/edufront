import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { StudentsTabComponent } from './components/students-tab/students-tab.component';
import { AddStudentPanelComponent } from './components/add-student-panel/add-student-panel.component';
import { EditStudentPanelComponent } from './components/edit-student-panel/edit-student-panel.component';
import { UserPillComponent } from './components/user-pill/user-pill.component';
import { UserPillSortedViewsComponent } from './components/user-pill-sorted-views/user-pill-sorted-views.component';
import { UsersShellComponent } from './containers/users-shell/users-shell.component';
import { UsersRoutingModule } from './users-routing/users-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StudentsTabComponent,
    AddStudentPanelComponent,
    EditStudentPanelComponent,
    UserPillComponent,
    UserPillSortedViewsComponent,
    UsersShellComponent
  ],
  imports: [CommonModule, UsersRoutingModule, SharedModule, FormsModule]
})
export class UsersModule {}
