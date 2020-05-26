import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { SchoolProfileV2RoutingModule } from './school-profile-v2-routing.module';
import { SchoolProfileShellComponent, ContactDetailsQuestionComponent, SchoolLogoQuestionComponent, SchoolLogoUploadComponent, SchoolProfileConfirmationComponent } from './containers';
import { SharedModule } from 'src/app/shared/shared.module';
import { schoolProfileReducer } from './ngrx/reducers';
import { SchoolNameQuestionComponent } from './containers/school-name-question/school-name-question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SchoolAddressQuestionComponent } from './containers/school-address-question/school-address-question.component';
import { ConfirmationBoxComponent } from './components/confirmation-box/confirmation-box.component';
import { EffectsModule } from '@ngrx/effects';
import { SchoolProfileEffects } from './ngrx/effects/effects';
import { SchoolProfileService } from './services/school-profile.service';


@NgModule({
  declarations: [
    SchoolProfileShellComponent,
    SchoolNameQuestionComponent,
    SchoolAddressQuestionComponent,
    ContactDetailsQuestionComponent,
    SchoolLogoQuestionComponent,
    SchoolLogoUploadComponent,
    SchoolProfileConfirmationComponent,
    ConfirmationBoxComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    SchoolProfileV2RoutingModule,
    StoreModule.forFeature('schoolProfile', schoolProfileReducer),
    EffectsModule.forFeature([SchoolProfileEffects])
  ],
  providers: [
    SchoolProfileService
  ]
})
export class SchoolProfileV2Module { }
