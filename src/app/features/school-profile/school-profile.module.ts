import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolProfileRoutingModule } from './school-profile-routing.module';

import * as fromContainers from './containers';
import * as fromComponents from './components';

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
    SchoolProfileRoutingModule
  ]
})
export class SchoolProfileModule { }
