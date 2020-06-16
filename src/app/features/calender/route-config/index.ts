import * as fromCalenderContainer from '../containers';
export const calenderNavigation = {
    'dates-of-academic-year': {
        previous: null,
        next: 'school-terms-question'
    },
    'school-terms-question': {
        previous: 'dates-of-academic-year',
        next: ''
    }
}
export const calenderRouteToComponentMap = {
    'dates-of-academic-year': fromCalenderContainer.AcademicYearQuestionComponent,
    'school-terms-question': fromCalenderContainer.SchoolTermsQuestionComponent
}