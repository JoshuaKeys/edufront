import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserSettingsShellComponent } from './containers';

import { ResetPasswordComponent } from './components';
const routes: Routes = [
  {
    path: '',
    component: UserSettingsShellComponent
  },
  {
    path: 'reset',
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSettingsRoutingModule {}
