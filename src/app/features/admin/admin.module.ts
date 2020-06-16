import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { } from "./user-settings";
// import { UserSettingsModule } from './user-settings/user-settings.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';

import { UserSettingsModule } from './user-settings/user-settings.module';

import { VisibilityToggleComponent } from './components';

let components = [VisibilityToggleComponent];

@NgModule({
  declarations: [...components, AdminComponent],
  imports: [CommonModule, SharedModule, AdminRoutingModule, UserSettingsModule]
})
export class AdminModule {}
