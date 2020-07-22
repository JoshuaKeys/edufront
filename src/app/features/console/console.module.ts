import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleShellComponent } from './containers/console-shell/console-shell.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConsoleRoutingModule } from './console-routing.module';
import { ConsoleHeaderComponent } from './components/console-header/console-header.component';
import { ConsoleClassesAndGroupsComponent } from './containers';



@NgModule({
  declarations: [
    ConsoleShellComponent,
    ConsoleHeaderComponent,
    ConsoleClassesAndGroupsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConsoleRoutingModule
  ]
})
export class ConsoleModule { }
