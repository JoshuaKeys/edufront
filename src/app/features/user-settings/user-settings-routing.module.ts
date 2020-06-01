import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingsShellComponent } from "./containers"


 
const routes: Routes = [
 
  {
    path: '',
    component: UserSettingsShellComponent
  }
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSettingsRoutingModule { }