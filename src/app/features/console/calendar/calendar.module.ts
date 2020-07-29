import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutComponent } from './containers/layout/layout.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ConsoleSearchComponent } from './components/search/search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConsoleCalendarOptionsComponent } from './components/options/options.component';
import { DeleteTermDialogComponent } from './components/delete-term-dialog/delete-term-dialog.component';
import { DialogModule } from 'src/app/shared/components/generic-dialog/dialog.module';
import { ConsoleComponentsModule } from '../components/console-components.module';
import { TimetableComponent } from './containers/timetable/timetable.component';

@NgModule({
  declarations: [
    LayoutComponent,
    ConsoleSearchComponent,
    ConsoleCalendarOptionsComponent,
    DeleteTermDialogComponent,
    TimetableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarRoutingModule,
    SharedModule,
    DragDropModule,
    DialogModule,
    ConsoleComponentsModule
  ],
  entryComponents: [DeleteTermDialogComponent]
})
export class CalendarModule { }
