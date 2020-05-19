import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { SchoolProfileRoutingModule } from './school-profile-routing.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import { reducers } from './ngrx/reducers';
import { SharedModule } from '../../shared/shared.module';
import { IdownloadDirective } from './components/idownload.directive';
import { EffectsModule } from '@ngrx/effects';
import { SchoolProfileEffects } from './ngrx/effects';

const components = [
  fromContainers.ShellComponent,
  fromContainers.NamePageComponent,
  fromContainers.AddressPageComponent,
  fromContainers.ConfirmationPageComponent,
  fromContainers.ContactDetailsPageComponent,
  fromContainers.LogoQuestionPageComponent,
  fromComponents.PreviewComponent,
  IdownloadDirective
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    SchoolProfileRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('schoolProfile', reducers),
   // EffectsModule.forFeature([SchoolProfileEffects])
  ],
  exports: [
    IdownloadDirective
  ]
})
export class SchoolProfileModule { }
