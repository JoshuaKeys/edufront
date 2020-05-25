import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { ModalComponent } from './components/modal/modal.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DraggableDirective } from './directives/draggable.directive';
import { ClassesComponent } from './components/classes/classes.component';
import { ClassesService } from './services/classes.service';
import { DroppableDirective } from './directives/droppable.directive';
import { PreviewComponent } from './components/preview/preview.component';
import { RouterModule } from '@angular/router';



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
    RouterModule
  ],
  exports: [
    ModalComponent,
    CustomSelectComponent,
    HeaderNavComponent,
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
