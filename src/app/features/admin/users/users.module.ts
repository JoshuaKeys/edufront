import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserExcelPreviewComponent } from './components/user-excel-preview/user-excel-preview.component';
import { UserSummaryPreviewComponent } from './components/user-summary-preview/user-summary-preview.component';
import { StudentsTabComponent } from './components/students-tab/students-tab.component';
import { AddStudentPanelComponent } from './components/add-student-panel/add-student-panel.component';
import { EditStudentPanelComponent } from './components/edit-student-panel/edit-student-panel.component';
import { UserPillComponent } from './components/user-pill/user-pill.component';
import { UserPillSortedViewsComponent } from './components/user-pill-sorted-views/user-pill-sorted-views.component';
import { UsersShellComponent } from './containers/users-shell/users-shell.component';
import { UsersRoutingModule } from './users-routing/users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StudentsService } from './services/students.service';

@NgModule({
  declarations: [
    UserExcelPreviewComponent,
    UserSummaryPreviewComponent,
    StudentsTabComponent,
    AddStudentPanelComponent,
    EditStudentPanelComponent,
    UserPillComponent,
    UserPillSortedViewsComponent,
    UsersShellComponent
  ],
  providers: [StudentsService],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class UsersModule {}
