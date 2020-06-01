import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

 import { RegisterComponent } from "./forms/register/register.component"
 import { LoginComponent } from "./forms/login/login.component"
 import { RecoverPasswordComponent } from "./forms/recover-password/recover-password.component"
 import { SecurityQuestionComponent} from "./forms/security-question/security-question.component"
import { SetPasswordComponent} from "./forms/set-password/set-password.component"
import { Register2Component} from "./forms/register2/register2.component"
import { ConfirmationMessageComponent } from "./messages/confirmation-message/confirmation-message.component"

 import { ProfileCompleteComponent } from "./messages/profile-complete/profile-complete-message.component"
 import { PasswordChangedMessageComponent } from "./messages/password-changed/password-changed-message.component"
 import { AccountCreatedMessageComponent } from "./messages/account-created/account-created-message.component"
 import { EmailMessageComponent } from "./messages/email/email-message.component"
 
 
 import { NavComponent, Profile1Component, Profile2Component, Profile3Component, Profile4Component } from "./profile"

const routes: Routes = [
  {
    path : 'message',
    component:ConfirmationMessageComponent
  },
  {
    path: 'profile1',
    component: Profile1Component
  } ,
  {
    path: 'profile2',
    component: Profile2Component
  } ,
  {
    path: 'profile3',
    component: Profile3Component
  } ,
  {
    path: 'profile4',
    component: Profile4Component
  } ,



  {
    path: 'register2',
    component: Register2Component
  } ,
  {
    path: 'set-password',
    component: SetPasswordComponent
  } ,
  {
    path: 'security-question',
    component: SecurityQuestionComponent
  } ,
  {
    path: 'register',
    component: RegisterComponent
  } ,
  {
    path: 'recover-password',
    component: RecoverPasswordComponent
  } ,
  {
    path: 'login',
    component: LoginComponent
  } ,
  {
    path: 'account-created',
    component: AccountCreatedMessageComponent
  } ,
  {
    path: 'email',
    component: EmailMessageComponent
  }   ,
  {
    path: 'password-changed',
    component: PasswordChangedMessageComponent
  }, {
    path: 'profile-complete',
    component: ProfileCompleteComponent
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterAndLoginRoutingModule { }