import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { ImageCropperModule } from 'ngx-image-cropper';
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
import { TimetableModule } from './components/timetable/timetable.module';
import { TimetableModule2 } from './components/timetable2/timetable2.module';
import { SubjectsService } from './services/subjects.service';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { CountryFieldComponent } from './components/country-field/country-field.component';
import { ImgUploadV2Component } from './components/img-upload-v2/img-upload-v2.component';
import { PhoneFieldComponent } from './components/phone-field/phone-field.component';
import { ButtonComponent } from './components/button/button.component';
import { FormComponentsModule } from './components/form-components/form-component.module';
import { SelectModule } from './components/form-components/select/select.module';
import { StudentsFormComponent } from './components/students-form/students-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageUploadV3Component } from './components/image-upload-v3/image-upload-v3.component';
import { ImgAuthPipe } from './pipes/img-auth.pipe';
import { PreviewAnimateDirective } from './directives/preview-animate.directive';
import { StopEventBubbleDirective } from './directives/stop-event-bubble.directive';
import { ImageSliderModule } from './components/image-slider/image-slider.module';
import { SharedTooltipComponent } from './components/tooltip/tooltip.component';
import { SharedStaffChipComponent } from './components/staff-chip/staff-chip.component';
import { SectionAsideComponent } from './components/section-aside/section-aside.component';
import { SectionDropBoxComponent } from './components/section-drop-box/section-drop-box.component';
import { OptionsComponent } from './components/options/options.component';
import { SubjectsListComponent } from './components/subjects-list/subjects-list.component';
import { SubjectsBoxComponent } from './components/subjects-box/subjects-box.component';
import { TimetableContainerComponent } from './components/timetable-container/timetable-container.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SimpleButtonComponent } from './components/simple-button/simple-button.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ExcelUploadComponent } from './components/excel-upload/excel-upload.component';

@NgModule({
  declarations: [
    ExcelUploadComponent,
    ModalComponent,
    ModalComponentV2,
    CustomSelectComponent,
    HeaderNavComponent,
    DraggableDirective,
    DroppableDirective,
    ClassesComponent,
    PreviewComponent,
    ImageUploadComponent,
    ImageUploadV3Component,
    IconFieldComponent,
    PhoneIconFieldComponent,
    InputFieldComponent,
    CustomPlainSelectComponent,
    IconButtonComponent,
    CountryFieldComponent,
    ImgUploadV2Component,
    PhoneFieldComponent,
    ButtonComponent,
    StudentsFormComponent,
    ImgAuthPipe,
    PreviewAnimateDirective,
    StopEventBubbleDirective,
    SharedStaffChipComponent,
    SharedTooltipComponent,
    SectionAsideComponent,
    SectionDropBoxComponent,
    OptionsComponent,
    SubjectsListComponent,
    SubjectsBoxComponent,
    TimetableContainerComponent,
    SimpleButtonComponent
  ],
  imports: [
    ImageSliderModule,
    ImageCropperModule,
    FormComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SelectModule,
    TimetableModule,
    TimetableModule2,
    DragDropModule,
    RouterModule,
    OverlayModule
  ],
  exports: [
    ExcelUploadComponent,
    ImageSliderModule,
    PreviewAnimateDirective,
    FormComponentsModule,
    ModalComponent,
    ModalComponentV2,
    CustomSelectComponent,
    HeaderNavComponent,
    ButtonComponent,
    DraggableDirective,
    DroppableDirective,
    ClassesComponent,
    ImageUploadV3Component,
    PreviewComponent,
    TimetableModule,
    TimetableModule2,
    ImageUploadComponent,
    IconFieldComponent,
    PhoneIconFieldComponent,
    InputFieldComponent,
    CustomPlainSelectComponent,
    IconButtonComponent,
    ImgUploadV2Component,
    CountryFieldComponent,
    PhoneFieldComponent,
    StudentsFormComponent,
    ImgAuthPipe,
    StopEventBubbleDirective,
    SharedStaffChipComponent,
    SharedTooltipComponent,
    SectionAsideComponent,
    SectionDropBoxComponent,
    OptionsComponent,
    SubjectsListComponent,
    SubjectsBoxComponent,
    TimetableContainerComponent,
    SimpleButtonComponent
  ],
  entryComponents: [SharedTooltipComponent],
  providers: [ClassesService, SubjectsService]
})
export class SharedModule { }
