import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { calenderReducer } from './ngrx/reducers';
import { CalenderRoutingModule } from './calender-routing.module';
import { AcademicYearQuestionComponent, CalenderShellComponent } from './containers';
import { SharedModule } from 'src/app/shared/shared.module';
import { PreviewParentComponent } from './components/preview-parent/preview-parent.component';
import { AcademicYearPreviewComponent } from './components/academic-year-preview/academic-year-preview.component';
import { SchoolTermsPreviewComponent } from './components/school-terms-preview/school-terms-preview.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AcademicYearQuestionComponent,
    CalenderShellComponent,
    PreviewParentComponent,
    AcademicYearPreviewComponent,
    SchoolTermsPreviewComponent
  ],
  imports: [
    CommonModule,
    CalenderRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('calendar', calenderReducer)
  ]
})
export class CalenderModule { }
