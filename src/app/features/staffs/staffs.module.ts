import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffsRoutingModule } from './staffs-routing.module';
import { StaffsShellComponent, StaffsCreationComponent } from './containers';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StaffsService } from './services/staffs.service';
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';
import { StaffChipComponent } from './components/staff-chip/staff-chip.component';
import { StoreModule } from '@ngrx/store';
import { staffsReducer } from './ngrx/reducers'
import { EffectsModule } from '@ngrx/effects';
import { StaffsEffects } from './ngrx/effects'
import { StaffFormComponent } from './components/staff-form/staff-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubjectsAreaComponent } from './components/subjects-area/subjects-area.component';
import { TotalStaffComponent } from './components/total-staff/total-staff.component';
import { SubjectClassesComponent } from './components/classes/subject-classes.component';
import { ClassesSubjectIconComponent } from './components/classes-subject-icon/classes-subject-icon.component';
import { ClassesAlphabeticallyComponent } from './components/classes-alphabetically/classes-alphabetically.component';
import { ClassesByGenderComponent } from './components/classes-by-gender/classes-by-gender.component';
import { StaffEditFormComponent } from './components/staff-edit-form/staff-edit-form.component';
@NgModule({
  declarations: [
    StaffsShellComponent,
    StaffsCreationComponent,
    StaffChipComponent,
    StaffFormComponent,
    StaffEditFormComponent,
    SubjectsAreaComponent,
    TotalStaffComponent,
    SubjectClassesComponent,
    ClassesSubjectIconComponent,
    ClassesAlphabeticallyComponent,
    ClassesByGenderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    StaffsRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('staffs', staffsReducer),
    EffectsModule.forFeature([StaffsEffects])
  ],
  providers: [
    StaffsService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ]
})
export class StaffsModule { }
