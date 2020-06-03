import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsRoutingModule } from './students-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { StudentsShellComponent } from './containers/students-shell/students-shell.component';
import { StoreModule } from '@ngrx/store';
import { studentsReducer } from './ngrx/reducers';
import { StudentsCreationComponent } from './containers/students-creation/students-creation.component';
import { StudentsService } from './services/students.service';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StudentsEffects } from './ngrx/effects';
import { StudentChipComponent } from './components/student-chip/student-chip.component';
import { SortAlphabeticallyComponent } from './components/sort-alphabetically/sort-alphabetically.component';
import { SortByGenderComponent } from './components/sort-by-gender/sort-by-gender.component';
import { SortByClassesComponent } from './components/sort-by-classes/sort-by-classes.component';
import { TotalStudentsComponent } from './components/total-students/total-students.component';
import { EditStudentsFormComponent } from './components/edit-students-form/edit-students-form.component';

@NgModule({
  declarations: [
    StudentsShellComponent,
    StudentsCreationComponent,
    StudentsFormComponent,
    StudentChipComponent,
    SortAlphabeticallyComponent,
    SortByGenderComponent,
    SortByClassesComponent,
    TotalStudentsComponent,
    EditStudentsFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    StudentsRoutingModule,
    StoreModule.forFeature('students', studentsReducer),
    EffectsModule.forFeature([StudentsEffects])
  ],
  providers: [
    StudentsService
  ]
})
export class StudentsModule { }
