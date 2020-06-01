import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { RegisterAndLoginRoutingModule } from "./register-and-login-routing.module"
import { SharedModule } from "../../shared/shared.module"

import { RegisterComponent } from "./forms/register/register.component"
import { LoginComponent } from "./forms/login/login.component"
import {VisibilityToggleComponent}  from "./components/visibility-toggle/visibility-toggle.component"
import { RecoverPasswordComponent } from "./forms/recover-password/recover-password.component"
import { SecurityQuestionComponent} from "./forms/security-question/security-question.component"
import { SetPasswordComponent} from "./forms/set-password/set-password.component"
import { Register2Component} from "./forms/register2/register2.component"
import { NavComponent, Profile1Component, Profile2Component, Profile3Component, Profile4Component } from "./profile"

import { ConfirmationMessageComponent } from "./messages/confirmation-message/confirmation-message.component";
import { AccountCreatedMessageComponent, EmailMessageComponent, PasswordChangedMessageComponent, ProfileCompleteComponent} from "./messages"
let messageTemplates = [AccountCreatedMessageComponent, EmailMessageComponent, PasswordChangedMessageComponent, ProfileCompleteComponent];
let profilComponents = [NavComponent, Profile1Component, Profile2Component, Profile3Component, Profile4Component]
let components = [...profilComponents, ...messageTemplates, ConfirmationMessageComponent,  VisibilityToggleComponent, RegisterComponent,RecoverPasswordComponent, LoginComponent,  SecurityQuestionComponent,SetPasswordComponent,Register2Component];

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
