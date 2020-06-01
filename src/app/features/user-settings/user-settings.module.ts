import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {     FormsModule, ReactiveFormsModule } from "@angular/forms";

import { UserSettingsRoutingModule } from "./user-settings-routing.module";
import {  SharedModule } from "src/app/shared/shared.module";


import { UserSettingsShellComponent } from "./containers"

@NgModule({
  declarations: [UserSettingsShellComponent],
  imports: [
    UserSettingsRoutingModule,

    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserSettingsModule { }
