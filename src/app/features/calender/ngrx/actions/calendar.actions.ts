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