import { createReducer, on } from '@ngrx/store';
import { CalendarModel } from '../../models/calendar.model';
import { setAcademicYearStartDate, setAcademicYearEndDate, toggleSelectedTerms, initializeTermsAndDates, setTermName, setTermEndDate, setTermStartDate, initializeVacations, addVacation, setVacationName, setVacationEndDate, setVacationStartDate, setNumberOfPeriods, toggleSelectedDay } from '../actions/calendar.actions';
import { TermsAndDates } from '../../models/terms-and-date.model';
import { VacationModel } from '../../models/vacation.model';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectTeachingDays } from '../selectors';

const initialState: CalendarModel = {
    // currentAcademicYear: {
    //     // startDate: '1996-07-07',
    //     // endDate: '2000-07-08'
    // }
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
                    termName: 'Term ' + (i+1),
                    startDate: null,
                    endDate: null
                })
            }
        }
        return {
            ...state,
            termsAndDates
        }
    }),
    on(setTermName, (state, action)=> {
        let stateCopy: CalendarModel = JSON.parse(JSON.stringify(state))
        let termsAndDates = stateCopy.termsAndDates;
        termsAndDates[action.idx].termName = action.termName;
        console.log(stateCopy);
        return {
            ...state,
            termsAndDates
        }
    }), 

    on(setTermEndDate, (state, action)=> {
        let stateCopy: CalendarModel = JSON.parse(JSON.stringify(state))
        let termsAndDates = stateCopy.termsAndDates;
        termsAndDates[action.idx].endDate = action.endDate;
        return {
            ...state,
            termsAndDates
        }
    }),
    on(setTermStartDate, (state, action)=> {
        let stateCopy: CalendarModel = JSON.parse(JSON.stringify(state))
        let termsAndDates = stateCopy.termsAndDates;
        termsAndDates[action.idx].startDate = action.startDate;
        return {
            ...state,
            termsAndDates
        }
    }),
    on(initializeVacations, (state, action)=> {
        const vacations: VacationModel[] = [];
            vacations.push({
                vacationName: 'Vacation 1',
                startDate: '',
                endDate: ''
            })
        return {
            ...state,
            vacations
        }
    }),
    on(addVacation, (state, action)=> {
        const stateCopy: CalendarModel = JSON.parse(JSON.stringify(state))
        let vacations = stateCopy.vacations;
        vacations.push({
            vacationName: `Vacation ${vacations.length + 1}`,
            startDate: '',
            endDate: ''
        })
        return {
            ...stateCopy,
            vacations
        }
    }),
    on(setVacationName, (state, action)=> {
        let stateCopy: CalendarModel = JSON.parse(JSON.stringify(state))
        let vacations = stateCopy.vacations;
        vacations[action.idx].vacationName = action.vacationName;
        return {
            ...state,
            vacations
        }
    }), 
    on(setVacationEndDate, (state, action)=> {
        let stateCopy: CalendarModel = JSON.parse(JSON.stringify(state))
        let vacations = stateCopy.vacations;
        vacations[action.idx].endDate = action.endDate;
        return {
            ...state,
            vacations
        }
    }),
    on(setVacationStartDate, (state, action)=> {
        let stateCopy: CalendarModel = JSON.parse(JSON.stringify(state))
        let vacations = stateCopy.vacations;
        vacations[action.idx].startDate = action.startDate;
        return {
            ...state,
            vacations
        }
    }),
    // on(setNumberOfPeriods, (state, action) => {
    //     const teachingState = selectTeachingDays()
    //     let stateCopy: CalendarModel = JSON.parse(JSON.stringify(state));
    //     stateCopy.periods = action.numberOfPeriods;
    //     return {
    //         ...stateCopy
            
    //     }
    // })
);