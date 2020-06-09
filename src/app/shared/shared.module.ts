import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';

// import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { ModalComponent } from './components/modal/modal.component';
import { CustomSelectComponent } from './components/custom-select/custom-select.component';
import { DraggableDirective } from './directives/draggable.directive';
import { ClassesComponent } from './components/classes/classes.component';
import { ClassesService } from './services/classes.service';
import { DroppableDirective } from './directives/droppable.directive';
import { PreviewComponent } from './components/preview/preview.component';
import { RouterModule } from '@angular/router';
import { ModalComponentV2 } from './components/modal-v2/modal.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { IconFieldComponent } from './components/icon-field/icon-field.component';
import { PhoneIconFieldComponent } from './components/phone-icon-field/phone-icon-field.component';
import { InputFieldComponent } from './components/input-field/input-field.component';
import { CustomPlainSelectComponent } from './components/custom-plain-select/custom-plain-select.component';

import { datePickerModule } from "./components/datepicker/datepicker.module";
import { ButtonComponent } from "./components/button/button.component"
import { PopoverComponent } from "./components/popover/popover.component"
import { PopoverOptionDirective } from "./components/popover/popover-option.directive"

import { TimetableModule } from "./components/timetable/timetable.module";
import { SubjectsService } from './services/subjects.service';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { CountryFieldComponent } from './components/country-field/country-field.component';
import { ImgUploadV2Component } from './components/img-upload-v2/img-upload-v2.component';
import { PhoneFieldComponent } from './components/phone-field/phone-field.component';

import { FormComponentsModule } from "./components/form-components/form-component.module";
import { SelectModule } from './components/form-components/select/select.module';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ModalComponent,
    ModalComponentV2,
    CustomSelectComponent,
    HeaderNavComponent,
    DraggableDirective,
    DroppableDirective,
    ClassesComponent,
    PreviewComponent,
    ImageUploadComponent,
    IconFieldComponent,
    PhoneIconFieldComponent,
    InputFieldComponent,
    CustomPlainSelectComponent,
    IconButtonComponent,
    CountryFieldComponent,
    ImgUploadV2Component,
    PhoneFieldComponent,
    ButtonComponent,
    PopoverComponent,
    PopoverOptionDirective,
    StudentsFormComponent
  ],
  imports: [
    FormComponentsModule,
    ReactiveFormsModule,
    CommonModule,
    datePickerModule,
    SelectModule,
    TimetableModule,
    RouterModule
  ],
  exports: [
    FormComponentsModule,
    ModalComponent,
    ModalComponentV2,
    CustomSelectComponent,
    HeaderNavComponent,
    ButtonComponent,
    datePickerModule,
    DraggableDirective,
    DroppableDirective,
    ClassesComponent,
    PreviewComponent,
    TimetableModule,
    ImageUploadComponent,
    IconFieldComponent,
    PhoneIconFieldComponent,
    InputFieldComponent,
    CustomPlainSelectComponent,
    IconButtonComponent,
    ImgUploadV2Component,
    CountryFieldComponent,
    PhoneFieldComponent,
    PopoverComponent,
    StudentsFormComponent
  ],
  providers: [
    ClassesService,
    SubjectsService
  ]
})
export class SharedModule { }
