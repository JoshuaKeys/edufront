import { createReducer, on } from '@ngrx/store';
import { CalendarModel } from '../../models/calendar.model';
import { setAcademicYearStartDate, setAcademicYearEndDate, toggleSelectedTerms, initializeTermsAndDates } from '../actions/calendar.actions';
import { TermsAndDates } from '../../models/terms-and-date.model';

const initialState: CalendarModel = {
    currentAcademicYear: {
        startDate: '1996-07-07',
        endDate: '2000-07-08'
    }
}
export const calendarReducer = createReducer(initialState,
    on(setAcademicYearStartDate, (state, action)=> {
        return {
            ...state,
            currentAcademicYear: {
                ...state.currentAcademicYear,
                startDate: action.startDate
            }
        }
    }),
    on(setAcademicYearEndDate, (state, action)=> {
        return {
            ...state,
            currentAcademicYear: {
                ...state.currentAcademicYear,
                endDate: action.endDate
            }
        }
    }),
    on(toggleSelectedTerms, (state, action)=> {
        let schoolTerms = undefined;
        if(state.schoolTerms !== action.schoolTerms) {
            schoolTerms = action.schoolTerms;
        }
        return {
            ...state,
            schoolTerms
        }
    }),
    on(initializeTermsAndDates, (state, action)=> {
        let schoolTerms = state.schoolTerms;
        const termsAndDates: TermsAndDates[] = [];
        if(schoolTerms) {
            for(let i = 0; i < schoolTerms; i++) {
                termsAndDates.push({
                    termName: `Term ${i+1}`,
                    startDate: null,
                    endDate: null
                })
            }
        }
        return {
            ...state,
            termsAndDates
        }
    })
);