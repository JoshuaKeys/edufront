import { createReducer, on } from '@ngrx/store';
import { PreviewModel } from '../../models/preview.model';
import { setPreviewAcademicYearStartDate, setPreviewAcademicYearEndDate, setSchoolTerms, toggleSelectedTerms } from '../actions/calendar.actions';
const initialState: PreviewModel = {
    datePreview: {
        route: '/calendar/dates-of-academic-year',
        // startDate: '2019',
        // endDate: '2020'
    },
    schoolTerms: {
        route: '/calendar/school-terms-question',
    }
}
export const previewReducer = createReducer(initialState,
    on(setPreviewAcademicYearStartDate, (state, action)=> {
        return {
            ...state,
            datePreview: {
                ...state.datePreview,
                startDate: action.startDate
            }
        }
    }),
    on(setPreviewAcademicYearEndDate, (state, action)=> {
        return {
            ...state,
            datePreview: {
                ...state.datePreview,
                endDate: action.endDate
            }
        }
    }),
    on(toggleSelectedTerms, (state, action)=> {
        let termsNumber = undefined;
        if(state.schoolTerms.termsNumber !== action.schoolTerms) {
            termsNumber = action.schoolTerms;
        }
        return {
            ...state,
            schoolTerms: {
                ...state.schoolTerms,
                termsNumber
            }
        }
    })
)