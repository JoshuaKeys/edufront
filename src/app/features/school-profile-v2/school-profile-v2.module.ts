import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { SchoolProfileV2RoutingModule } from './school-profile-v2-routing.module';
import { SchoolProfileShellComponent, ContactDetailsQuestionComponent, SchoolLogoQuestionComponent, SchoolLogoUploadComponent } from './containers';
import { SharedModule } from 'src/app/shared/shared.module';
import { schoolProfileReducer } from './ngrx/reducers';
import { SchoolNameQuestionComponent } from './containers/school-name-question/school-name-question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IconFieldComponent } from './components/icon-field/icon-field.component'
import { SchoolAddressQuestionComponent } from './containers/school-address-question/school-address-question.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { PhoneIconFieldComponent } from './components/phone-icon-field/phone-icon-field.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';


@NgModule({
  declarations: [
    SchoolProfileShellComponent,
    SchoolNameQuestionComponent,
    IconFieldComponent,
    SchoolAddressQuestionComponent,
    InputFieldComponent,
    ContactDetailsQuestionComponent,
    PhoneIconFieldComponent,
    SchoolLogoQuestionComponent,
    SchoolLogoUploadComponent,
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    SchoolProfileV2RoutingModule,
    StoreModule.forFeature('schoolProfile', schoolProfileReducer)
  ]
})
export class SchoolProfileV2Module { }
