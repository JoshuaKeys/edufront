import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { calenderReducer } from './ngrx/reducers';
import { CalenderRoutingModule } from './calender-routing.module';
import {
  AcademicYearQuestionComponent,
  CalenderShellComponent,
  SchoolTermsQuestionComponent,
  TermNamesAndDatesQuestionComponent,
  VacationNamesAndDatesQuestionComponent,
  GovernmentHolidaysObservedQuestionComponent,
  TeachingDayForClassQuestionComponent
} from './containers';
import { SharedModule } from 'src/app/shared/shared.module';
import { PreviewParentComponent } from './components/preview-parent/preview-parent.component';
import { AcademicYearPreviewComponent } from './components/academic-year-preview/academic-year-preview.component';
import { SchoolTermsPreviewComponent } from './components/school-terms-preview/school-terms-preview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TermsComponent } from './components/terms/terms.component';
import { TermsDatesPreviewComponent } from './components/terms-dates-preview/terms-dates-preview.component';
import { VacationDatesPreviewComponent } from './components/vacation-dates-preview/vacation-dates-preview.component';
import { HolidayListComponent } from './containers/holiday-list/holiday-list.component';
import { HolidayAddComponent } from './components/holiday-add/holiday-add.component';
import { HolidayPillComponent } from './components/holiday-pill/holiday-pill.component';
import { CalendarService } from './services/calendar.service';
import { EffectsModule } from '@ngrx/effects';
import { CalendarEffects } from './ngrx/effects';

@NgModule({
  declarations: [
    TeachingDayForClassQuestionComponent,
    AcademicYearQuestionComponent,
    CalenderShellComponent,
    PreviewParentComponent,
    AcademicYearPreviewComponent,
    SchoolTermsPreviewComponent,
    TermsComponent,
    SchoolTermsQuestionComponent,
    TermNamesAndDatesQuestionComponent,
    VacationNamesAndDatesQuestionComponent,
    GovernmentHolidaysObservedQuestionComponent,
    TermsDatesPreviewComponent,
    VacationDatesPreviewComponent,
    HolidayListComponent,
    HolidayAddComponent,
    HolidayPillComponent
  ],
  imports: [
    CommonModule,
    CalenderRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([CalendarEffects]),
    StoreModule.forFeature('calendar', calenderReducer)
  ],
  providers: [CalendarService]
})
export class CalenderModule {}
