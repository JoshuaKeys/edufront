import * as fromCalenderContainer from '../containers';
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
    next: ''
  }
};
export const calenderRouteToComponentMap = {
  'dates-of-academic-year': fromCalenderContainer.AcademicYearQuestionComponent,
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
  'teaching-days': fromCalenderContainer.TeachingDaysComponent
};
