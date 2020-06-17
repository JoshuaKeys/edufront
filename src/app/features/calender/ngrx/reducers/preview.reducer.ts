import { createReducer, on } from '@ngrx/store';
import { PreviewModel } from '../../models/preview.model';
import { setPreviewAcademicYearStartDate, setPreviewAcademicYearEndDate, setSchoolTerms, toggleSelectedTerms, setTermStartDate, initializeTermsAndDates, setTermEndDate } from '../actions/calendar.actions';
const initialState: PreviewModel = {
    datePreview: {
        route: '/calendar/dates-of-academic-year',
        // startDate: '2019',
        // endDate: '2020'
    },
    schoolTerms: {
        route: '/calendar/school-terms-question',
    },
    termsNamesAndDates: {
        route: '/calendar/term-names-and-dates-question'
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
    }),
    on(initializeTermsAndDates, (state, action)=> {
        const schoolTerms = state.schoolTerms;

        return {
            ...state,
            termsNamesAndDates: {
                ...state.termsNamesAndDates,
                items: new Array(schoolTerms.termsNumber).fill({
                    termName: '',
                    startDate: '',
                    endDate: ''
                })
            }
        }
    }),
    on(setTermStartDate, (state, action)=> {
        const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
        let item = stateCopy.termsNamesAndDates.items[action.idx]
        item.startDate = action.startDate;
        return stateCopy;
    }),
    on(setTermEndDate, (state, action)=> {
        const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
        let item = stateCopy.termsNamesAndDates.items[action.idx]
        item.endDate = action.endDate;
        return stateCopy;
    })
)