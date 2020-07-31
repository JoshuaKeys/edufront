import { NgModule } from '@angular/core';
import { SidePanelComponent } from './side-panel/side-panel.component';
import { ConsoleShellComponent } from '../containers';
import { ConsoleHeaderComponent } from './console-header/console-header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SidePanelComponent,
    ConsoleShellComponent,
    ConsoleHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [SidePanelComponent, ConsoleShellComponent, ConsoleHeaderComponent],
  entryComponents: [],
  providers: []
})
export class ConsoleComponentsModule { }
