import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolProfileRoutingModule } from './school-profile-routing.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { schoolProfileReducer } from '../../core/store/reducers/school-profile.reducer';

const components = [
  fromContainers.ShellComponent,
  fromContainers.NamePageComponent,
  fromContainers.AddressPageComponent,
  fromContainers.ConfirmationPageComponent,
  fromContainers.ContactDetailsPageComponent,
  fromContainers.LogoQuestionPageComponent,
  fromComponents.PreviewComponent
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    SchoolProfileRoutingModule,
    ReactiveFormsModule,
    //StoreModule.forFeature('schoolProfile', schoolProfileReducer)
  ]
})
export class SchoolProfileModule { }
