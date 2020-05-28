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
import { ImgUploadV2Component } from './components/img-upload-v2/img-upload-v2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubjectsAreaComponent } from './components/subjects-area/subjects-area.component';
import { TotalStaffComponent } from './components/total-staff/total-staff.component';
import { PhoneFieldComponent } from './components/phone-field/phone-field.component';
import { CountryFieldComponent } from './components/country-field/country-field.component';
import { SubjectClassesComponent } from './components/classes/subject-classes.component';
import { ClassesSubjectIconComponent } from './components/classes-subject-icon/classes-subject-icon.component';
@NgModule({
  declarations: [
    StaffsShellComponent,
    StaffsCreationComponent,
    StaffChipComponent,
    StaffFormComponent,
    ImgUploadV2Component,
    SubjectsAreaComponent,
    TotalStaffComponent,
    PhoneFieldComponent,
    CountryFieldComponent,
    SubjectClassesComponent,
    ClassesSubjectIconComponent
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
