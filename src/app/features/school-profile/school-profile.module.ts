import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { SchoolProfileRoutingModule } from './school-profile-routing.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';
import { reducers } from './ngrx/reducers';

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
    StoreModule.forFeature('schoolProfile', reducers)
  ]
})
export class SchoolProfileModule { }
