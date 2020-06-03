import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserSettingsRoutingModule } from './user-settings-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserSettingsShellComponent } from './containers';
import {
  ProfileSettingsMainComponent,
  EmailTabComponent,
  SecurityTabComponent,
  SecurityTabQuestionComponent,
  SecurityTabPasswordComponent,
  ProfileTabComponent,
  ProfileDeactivateModalComponent
} from './components';
import {
  VisibilityToggleComponent,
  ResetPasswordComponent
} from './components';
import {
  SchoolSettingsComponent,
  SchoolDeactivateModalComponent
} from './components';

const schoolComponents = [
  SchoolSettingsComponent,
  SchoolDeactivateModalComponent
];
const component = [VisibilityToggleComponent, ResetPasswordComponent];
const profileComponents = [
  ProfileDeactivateModalComponent,
  ProfileSettingsMainComponent,
  EmailTabComponent,
  SecurityTabComponent,
  SecurityTabQuestionComponent,
  SecurityTabPasswordComponent,
  ProfileTabComponent
];

@NgModule({
  declarations: [
    ...schoolComponents,
    ...component,
    ...profileComponents,
    UserSettingsShellComponent
  ],
  imports: [
    UserSettingsRoutingModule,

    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserSettingsModule {}
