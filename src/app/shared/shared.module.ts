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

import { SelectModule } from "./components/select/select.module"
import {datePickerModule} from "./components/datepicker/datepicker.module";

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
    CommonModule,
    datePickerModule,
    SelectModule
  ],
  exports: [
    ModalComponent,
    CustomSelectComponent,
    HeaderNavComponent,
    datePickerModule,
    SelectModule,
    DraggableDirective,
    DroppableDirective,
    ClassesComponent,
    PreviewComponent
  ],
  providers: [
    ClassesService
  ]
})
export class SharedModule { }
