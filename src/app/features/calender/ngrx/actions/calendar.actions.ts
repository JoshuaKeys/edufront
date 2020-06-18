import { createAction, props } from '@ngrx/store';

export const setPreviewAcademicYearStartDate = createAction(
    '[AcademicYearQuestionComponent] setPreviewAcademicYearStartDate',
    props<{startDate: string}>()
);
export const setPreviewAcademicYearEndDate = createAction(
    '[AcademicYearQuestionComponent] setPreviewAcademicYearEndDate',
    props<{endDate: string}>()
);
export const setAcademicYearStartDate = createAction(
    '[AcademicYearQuestionComponent] setAcademicYearStartDate',
    props<{startDate: string}>()
);
export const setAcademicYearEndDate = createAction(
    '[AcademicYearQuestionComponent] setAcademicYearEndDate',
    props<{endDate: string}>()
)
export const setSchoolTerms = createAction(
    '[SchoolTermsQuestionComponent] setSchoolTerms',
    props<{schoolTerms: number}>()
);
export const toggleSelectedTerms = createAction(
    '[SchoolTermsQuestionComponent] toggleSelectedTerms',
    props<{schoolTerms: number}>()
)
export const initializeTermsAndDates = createAction(
    '[SchoolTermsQuestionComponent] initializeTermsAndDates'
)
export const setTermName = createAction(
    '[TermNamesAndDatesComponent] setTermName',
    props<{idx: number, termName: string}>()
);
export const setTermStartDate = createAction(
    '[TermNamesAndDatesComponent] setTermStartDate',
    props<{idx: number, startDate: string}>()
);
export const setTermEndDate = createAction(
    '[TermNamesAndDatesComponent] setTermEndDate',
    props<{idx: number, endDate: string}>()
);
export const initializeVacations = createAction(
    '[SchoolTermsQuestionComponent] initializeVacations'
);
export const addVacation = createAction(
    '[VacationNamesAndDatesComponent] addVacation'
);
export const setVacationName = createAction(
    '[VacationNamesAndDatesComponent] setVacationName',
    props<{idx: number, vacationName: string}>()
);
export const setVacationStartDate = createAction(
    '[VacationNamesAndDatesComponent] setVacationStartDate',
    props<{idx: number, startDate: string}>()
);
export const setVacationEndDate = createAction(
    '[VacationNamesAndDatesComponent] setVacationEndDate',
    props<{idx: number, endDate: string}>()
)