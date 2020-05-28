import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';

// import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { ModalComponent } from './components/modal/modal.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DraggableDirective } from './directives/draggable.directive';
import { ClassesComponent } from './components/classes/classes.component';
import { ClassesService } from './services/classes.service';
import { DroppableDirective } from './directives/droppable.directive';
import { PreviewComponent } from './components/preview/preview.component';


import {datePickerModule} from "./components/datepicker/datepicker.module";
import { TimetableModule } from "./components/timetable/timetable.module";

import { FormComponentsModule } from "./components/form-components/form-component.module"


@NgModule({
  declarations: [
    ModalComponent,
    CustomSelectComponent,
     HeaderNavComponent,
    DraggableDirective,
    DroppableDirective,
    ClassesComponent,
    PreviewComponent,
  ],
  imports: [
    FormComponentsModule,
    CommonModule,
    datePickerModule,
    TimetableModule
  ],
  exports: [
    FormComponentsModule,
    ModalComponent,
    CustomSelectComponent,
    HeaderNavComponent,
    datePickerModule,
    DraggableDirective,
    DroppableDirective,
    ClassesComponent,
    PreviewComponent,
    TimetableModule
  ],
  providers: [
    ClassesService
  ]
})
export class SharedModule { }
