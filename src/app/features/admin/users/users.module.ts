import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsTabComponent } from './components/students-tab/students-tab.component';
import { UsersRoutingModule } from './users-routing/users-routing.module';

@NgModule({
  declarations: [StudentsTabComponent],
  imports: [CommonModule, UsersRoutingModule]
})
export class UsersModule {}
