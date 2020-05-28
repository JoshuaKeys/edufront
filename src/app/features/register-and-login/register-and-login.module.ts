import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RegisterAndLoginRoutingModule } from "./register-and-login-routing.module"
import { SharedModule } from "../../shared/shared.module"

import { RegisterComponent } from "./forms/register/register.component"
import { LoginComponent } from "./forms/login/login.component"
import {VisibilityToggleComponent}  from "./components/visibility-toggle/visibility-toggle.component"

let components = [VisibilityToggleComponent, RegisterComponent, LoginComponent];

@NgModule({
  declarations: [...components],
  imports: [
    RegisterAndLoginRoutingModule,
    CommonModule,
    SharedModule,
    FormsModule,
  
    ReactiveFormsModule
  ]
})
export class RegisterAndLoginModule { }
