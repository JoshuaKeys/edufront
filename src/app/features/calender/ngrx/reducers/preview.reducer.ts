import { createReducer, on } from '@ngrx/store';
import { PreviewModel } from '../../models/preview.model';
import { TermsAndDates } from '../../models/terms-and-date.model'
import { setPreviewAcademicYearStartDate, setPreviewAcademicYearEndDate, setSchoolTerms, toggleSelectedTerms, setTermStartDate, initializeTermsAndDates, setTermEndDate, setTermName, initializeVacations, addVacation, setVacationEndDate, setVacationName, setVacationStartDate } from '../actions/calendar.actions';
import { VacationModel } from '../../models/vacation.model';
const initialState: PreviewModel = {
    datePreview: {
        route: '/calendar/dates-of-academic-year',
    },
    schoolTerms: {
        route: '/calendar/school-terms-question',
    },
    termsNamesAndDates: {
        route: '/calendar/term-names-and-dates-question'
    },
    termVacations: {
        route: '/calendar/vacation-names-and-dates'
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
        let items: TermsAndDates[] = []
        for(let i = 0; i < schoolTerms.termsNumber; i++) {
            items.push({
                termName: 'Term '+(i +1),
                startDate: '',
                endDate: ''
            })
        }
        return {
            ...state,
            termsNamesAndDates: {
                ...state.termsNamesAndDates,
                items
            }
        }
    }),
    on(initializeVacations, (state, action)=> {
        let vacations: VacationModel[] = []
            vacations.push({
                vacationName: 'Vacation 1',
                startDate: '',
                endDate: ''
            })
        return {
            ...state,
            termVacations: {
                ...state.termVacations,
                items: [...vacations]
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
    }),
    on(setTermName, (state, action)=> {
        const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
        let item = stateCopy.termsNamesAndDates.items[action.idx]
        item.termName = action.termName;
        return stateCopy;
    }),
    on(addVacation, (state, action)=> {
        const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
        stateCopy.termVacations.items.push({
            vacationName: `Vacation ${stateCopy.termVacations.items.length + 1}`,
            startDate: '',
            endDate: ''
        })
        return stateCopy
    }),
    on(setVacationStartDate, (state, action)=> {
        const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
        let item = stateCopy.termVacations.items[action.idx]
        item.startDate = action.startDate;
        return stateCopy;
    }),
    on(setVacationEndDate, (state, action)=> {
        const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
        let item = stateCopy.termVacations.items[action.idx]
        item.endDate = action.endDate;
        return stateCopy;
    }),
    on(setVacationName, (state, action)=> {
        const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
        let item = stateCopy.termVacations.items[action.idx]
        item.vacationName = action.vacationName;
        return stateCopy;
    }),
);