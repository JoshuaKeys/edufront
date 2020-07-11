import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { SchoolProfileV2RoutingModule } from './school-profile-v2-routing.module';
import {
  SchoolProfileShellComponent,
  ContactDetailsQuestionComponent,
  SchoolLogoQuestionComponent,
  SchoolLogoUploadComponent,
  SchoolProfileConfirmationComponent
} from './containers';
import { SharedModule } from 'src/app/shared/shared.module';
import { schoolProfileReducer } from './ngrx/reducers';
import { SchoolNameQuestionComponent } from './containers/school-name-question/school-name-question.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SchoolAddressQuestionComponent } from './containers/school-address-question/school-address-question.component';
import { ConfirmationBoxComponent } from './components/confirmation-box/confirmation-box.component';
import { EffectsModule } from '@ngrx/effects';
import { SchoolProfileEffects } from './ngrx/effects/effects';
import { SchoolProfileService } from './services/school-profile.service';
import { ParentPreviewComponent } from './components/parent-preview/parent-preview.component';
import { SchoolNamePreviewComponent } from './components/school-name-preview/school-name-preview.component';
import { SchoolAddressPreviewComponent } from './components/school-address-preview/school-address-preview.component';
import { SchoolContactsPreviewComponent } from './components/school-contacts-preview/school-contacts-preview.component';
import { SchoolLogoPreviewComponent } from './components/school-logo-preview/school-logo-preview.component';

@NgModule({
  declarations: [
    SchoolProfileShellComponent,
    SchoolNameQuestionComponent,
    SchoolAddressQuestionComponent,
    ContactDetailsQuestionComponent,
    SchoolLogoQuestionComponent,
    SchoolLogoUploadComponent,
    SchoolProfileConfirmationComponent,
    ConfirmationBoxComponent,
    ParentPreviewComponent,
    SchoolNamePreviewComponent,
    SchoolAddressPreviewComponent,
    SchoolContactsPreviewComponent,
    SchoolLogoPreviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    SchoolProfileV2RoutingModule,
    StoreModule.forFeature('schoolProfile', schoolProfileReducer),
    EffectsModule.forFeature([SchoolProfileEffects])
  ],
  providers: [SchoolProfileService]
})
export class SchoolProfileV2Module { }
