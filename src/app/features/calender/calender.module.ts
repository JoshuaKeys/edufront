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
  TeachingDaysComponent,
  SameTeachingDaysQuestionComponent,
  SamePeriodsForClassesQuestionComponent,
  TeachingPeriodsPerDayComponent,
  SamePeriodsPerTimeComponent,
  StartTimeOfFirstPeriodComponent,
  StartTimeOfEachPeriodComponent,
  PeriodDurationComponent,
  CommonAssemblyQuestionComponent,
  CalendarConfirmationComponent
} from './containers';
import { SharedModule } from 'src/app/shared/shared.module';
import { PreviewParentComponent } from './components/preview-parent/preview-parent.component';
import { AcademicYearPreviewComponent } from './components/academic-year-preview/academic-year-preview.component';
import { SchoolTermsPreviewComponent } from './components/school-terms-preview/school-terms-preview.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TermsComponent } from './components/terms/terms.component';
import { TermsDatesPreviewComponent } from './components/terms-dates-preview/terms-dates-preview.component';
import { VacationDatesPreviewComponent } from './components/vacation-dates-preview/vacation-dates-preview.component';
import { HolidayListComponent } from './containers/holiday-list/holiday-list.component';
import { HolidayAddComponent } from './components/holiday-add/holiday-add.component';
import { HolidayPillComponent } from './components/holiday-pill/holiday-pill.component';
import { CalendarService } from './services/calendar.service';
import { EffectsModule } from '@ngrx/effects';
import { CalendarEffects } from './ngrx/effects';
import { DaysOfWeekComponent } from './components/days-of-week/days-of-week.component';
import { TeachingDayForClassQuestionComponent } from './containers/teaching-day-for-class-question/teaching-day-for-class-question.component';
import { DaysOfWeekPreviewComponent } from './components/days-of-week-preview/days-of-week-preview.component';
import { NumberOfPeriodsComponent } from './containers/number-of-periods/number-of-periods.component';
import { PeriodsPerDayComponent } from './components/periods-per-day/periods-per-day.component';
import { PeriodsPreviewComponent } from './components/periods-preview/periods-preview.component';
import { TimetablePreviewComponent } from './components/timetable-preview/timetable-preview.component';
import { TimetablePreview2Component } from './components/timetable-preview2/timetable-preview2.component';
import { TimetableCardComponent } from './components/timetable-card/timetable-card.component';
import { PreviewTestComponent } from './components/preview-test/preview-test.component';
import { pages } from './pages';
import { StartTimePerDayComponent } from './components/start-time-per-day/start-time-per-day.component';
import { BreakScheduleQuestionComponent } from './containers/break-schedule-question/break-schedule-question.component';
import { AssemblyDetailsComponent } from './containers/assembly-details/assembly-details.component';
import { DefineYourBreakComponent } from './containers/define-your-break/define-your-break.component';
import { PeriodIntervalComponent } from './containers/period-interval/period-interval.component';
import { PopoverModule } from 'src/app/shared/components/form-components/popover/popover.module';
import { FormComponentsModule } from 'src/app/shared/components/form-components/form-component.module';
import { DefineSameBreaksComponent } from './containers/define-same-breaks/define-same-breaks.component';
import { OrphanClassesComponent } from './components/orphan-classes/orphan-classes.component';
@NgModule({
  declarations: [
    ...pages,
    TimetablePreviewComponent,
    TimetablePreview2Component,
    TimetableCardComponent,
    PreviewTestComponent,
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
    HolidayPillComponent,
    TeachingDaysComponent,
    SameTeachingDaysQuestionComponent,
    DaysOfWeekComponent,
    DaysOfWeekPreviewComponent,
    SamePeriodsForClassesQuestionComponent,
    NumberOfPeriodsComponent,
    TeachingPeriodsPerDayComponent,
    PeriodsPerDayComponent,
    PeriodsPreviewComponent,
    SamePeriodsPerTimeComponent,
    StartTimeOfFirstPeriodComponent,
    SamePeriodsPerTimeComponent,
    StartTimeOfEachPeriodComponent,
    StartTimePerDayComponent,
    PeriodDurationComponent,
    BreakScheduleQuestionComponent,
    AssemblyDetailsComponent,
    DefineYourBreakComponent,
    DefineSameBreaksComponent,
    PeriodIntervalComponent,
    CommonAssemblyQuestionComponent,
    CalendarConfirmationComponent,
    OrphanClassesComponent
  ],
  imports: [
    CommonModule,
    CalenderRoutingModule,
    SharedModule,
    PopoverModule,
    FormsModule,
    FormComponentsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([CalendarEffects]),
    StoreModule.forFeature('calendar', calenderReducer)
  ],
  providers: [CalendarService]
})
export class CalenderModule {}
