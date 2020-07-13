import * as fromCalenderContainer from '../containers';
import { PreviewTestComponent } from '../components/preview-test/preview-test.component';
export const calenderNavigation = {
  'dates-of-academic-year': {
    previous: null,
    next: 'school-terms-question'
  },
  'school-terms-question': {
    previous: 'dates-of-academic-year',
    next: 'term-names-and-dates-question'
  },
  'term-names-and-dates-question': {
    previous: 'school-terms-question',
    next: 'vacation-names-and-dates'
  },
  'vacation-names-and-dates': {
    previous: 'term-names-and-dates-question',
    next: 'government-holidays-observed-question'
  },
  'government-holidays-observed-question': {
    previous: 'vacation-names-and-dates',
    next: 'holiday-list'
  },
  'holiday-list': {
    previous: 'government-holidays-observed-question',
    next: 'same-teaching-days-question'
  },
  'same-teaching-days-question': {
    previous: 'holiday-list',
    next: 'teaching-days'
  },
  'teaching-days': {
    previous: 'same-teaching-days-question',
    next: 'teaching-day-for-class-question'
  },
  'teaching-day-for-class-question': {
    previous: 'teaching-days',
    next: 'same-periods-for-classes-question'
  },
  'same-periods-for-classes-question': {
    previous: 'teaching-day-for-class-question',
    next: 'number-of-periods'
  },
  'number-of-periods': {
    previous: 'same-periods-for-classes-question',
    next: 'teaching-periods-per-day'
  },
  'teaching-periods-per-day': {
    previous: 'number-of-periods',
    next: 'same-periods-per-time'
  },
  'same-periods-per-time': {
    previous: 'teaching-periods-per-day',
    next: 'start-time-of-first-period'
  },
  'start-time-of-first-period': {
    previous: 'same-periods-per-time',
    next: 'period-duration'
  },
  'start-time-of-each-period': {
    previous: 'same-periods-per-time',
    next: 'period-duration'
  },
  'period-duration': {
    previous: 'start-time-of-each-period',
    next: 'period-interval'
  },
  'period-interval': {
    previous: 'period-duration',
    next: 'common-assembly-question'
  },
  'common-assembly-question': {
    previous: 'period-interval',
    next: 'assembly-details'
  },
  'assembly-details': {
    previous: 'common-assembly-question',
    next: 'break-schedule-question'
  },
  'break-schedule-question': {
    previous: 'common-assembly-question',
    next: 'break-definition'
  },
  'break-definition': {
    previous: 'break-schedule-question',
    next: 'calendar-confirmation'
  },
  'same-break-definition': {
    previous: 'break-schedule-question',
    next: 'calendar-confirmation'
  },
  'calendar-confirmation': {
    previous: 'break-definition',
    next: 'update-timetable'
  },
  'update-timetable': {
    previous: 'calendar-confirmation',
    next: ''
  }
};

export const calenderRouteToComponentMap = {
  'dates-of-academic-year': fromCalenderContainer.AcademicYearQuestionComponent,
  // 'dates-of-academic-year': PreviewTestComponent,
  'school-terms-question': fromCalenderContainer.SchoolTermsQuestionComponent,
  'term-names-and-dates-question':
    fromCalenderContainer.TermNamesAndDatesQuestionComponent,
  'vacation-names-and-dates':
    fromCalenderContainer.VacationNamesAndDatesQuestionComponent,
  'government-holidays-observed-question':
    fromCalenderContainer.GovernmentHolidaysObservedQuestionComponent,
  'holiday-list': fromCalenderContainer.HolidayListComponent,
  'same-teaching-days-question':
    fromCalenderContainer.SameTeachingDaysQuestionComponent,
  'teaching-days': fromCalenderContainer.TeachingDaysComponent,
  'teaching-day-for-class-question':
    fromCalenderContainer.TeachingDayForClassQuestionComponent,
  'same-periods-for-classes-question':
    fromCalenderContainer.SamePeriodsForClassesQuestionComponent,
  'number-of-periods': fromCalenderContainer.NumberOfPeriodsComponent,
  'teaching-periods-per-day':
    fromCalenderContainer.TeachingPeriodsPerDayComponent,
  'same-periods-per-time': fromCalenderContainer.SamePeriodsPerTimeComponent,
  'start-time-of-first-period':
    fromCalenderContainer.StartTimeOfFirstPeriodComponent,
  'start-time-of-each-period':
    fromCalenderContainer.StartTimeOfEachPeriodComponent,
  'period-duration': fromCalenderContainer.PeriodDurationComponent,
  'period-interval': fromCalenderContainer.PeriodIntervalComponent,
  'common-assembly-question':
    fromCalenderContainer.CommonAssemblyQuestionComponent,
  'assembly-details': fromCalenderContainer.AssemblyDetailsComponent,
  'break-schedule-question':
    fromCalenderContainer.BreakScheduleQuestionComponent,
  'break-definition': fromCalenderContainer.DefineYourBreakComponent,
  'calendar-confirmation': fromCalenderContainer.CalendarConfirmationComponent,
  'same-break-definition': fromCalenderContainer.DefineSameBreaksComponent,
  'update-timetable': fromCalenderContainer.UpdateTimetableComponent
};
