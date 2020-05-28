import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

 import { RegisterComponent } from "./forms/register/register.component"
 import { LoginComponent } from "./forms/login/login.component"

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  } ,
  {
    path: 'login',
    component: LoginComponent
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterAndLoginRoutingModule { }