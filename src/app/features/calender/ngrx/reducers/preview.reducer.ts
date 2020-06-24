import { createReducer, on } from '@ngrx/store';
import { PreviewModel } from '../../models/preview.model';
import { TermsAndDates } from '../../models/terms-and-date.model'
import { setPreviewAcademicYearStartDate, setPreviewAcademicYearEndDate, setSchoolTerms, toggleSelectedTerms, setTermStartDate, initializeTermsAndDates, setTermEndDate, setTermName, initializeVacations, addVacation, setVacationEndDate, setVacationName, setVacationStartDate, toggleSelectedDay, setDefaultTeachingDays, fetchClassesAndGroupsSuccess, toggleClassesGroupActive, reassignClass, setNumberOfPeriods, updateSelectedTeachingDays, assignPeriodsToTeachingDates, addClassesGroup } from '../actions/calendar.actions';
import { VacationModel } from '../../models/vacation.model';
import { TeachingDay } from '../../models/teaching-day.model';
import { clearClassOffGroups } from '../../utilities';
import { ClassGroupModel } from '../../models/class-group.model';
import { PeriodModel } from '../../models/period.model';
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
    },
    teachingDays: {
        route: '/calendar/teaching-days',
        items: [
            {day: 'Mon', selected: false},
            {day: 'Tue', selected: false},
            {day: 'Wed', selected: false},
            {day: 'Thu', selected: false},
            {day: 'Fri', selected: false},
            {day: 'Sat', selected: false},
            {day: 'Sun', selected: false}
        ]
    },
    periods: {
        route: '/calendar/same-periods-for-classes-question'
    }
}
export const previewReducer = createReducer(initialState,
    on(setNumberOfPeriods, (state, action) => {
        const teachingDays = state.teachingDays.items;
        const periodsArr = [];
        for(let i = 1; i <= action.numberOfPeriods; i++) {
            periodsArr.push('P' + i)
        }
        const periodsObjs = teachingDays.filter(teachingDay => teachingDay.selected)
            .map(teachingDay=> {
                return {
                    day: teachingDay.day,
                    periods: periodsArr
                }
            })
        const classesAndGroupsCopy: ClassGroupModel[] = JSON.parse(JSON.stringify(state.teachingDays.classesAndGroupItems))
        console.log(classesAndGroupsCopy)
        return {
            ...state,
            periods: {
                ...state.periods,
                items: periodsObjs,

            },
        }
    }),
    // on(assignPeriodsToTeachingDates, (state, action) => {
    //     const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    //     const updatedClassesAndGroups = stateCopy.periods.classesAndGroupItems.map(classAndGroup=> {
    //         const teachingDaysArr = classAndGroup.teachingDays.map(teachingDay=> {
    //             if(teachingDay.selected) {
    //                 teachingDay.period = action.numberOfPeriods
    //             }
    //             return teachingDay
    //         })
    //         classAndGroup.teachingDays = teachingDaysArr;
    //         return classAndGroup
    //     })
    //     return {
    //         ...stateCopy,
    //         classesAndGroups: updatedClassesAndGroups
    //     }
    // }),
    on(assignPeriodsToTeachingDates, (state, action)=> {
        const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
        const updatedClassesAndGroups = stateCopy.teachingDays.classesAndGroupItems.map(classAndGroup=> {
            const periodsArr: PeriodModel[] = classAndGroup.teachingDays.map(teachingDay=> {
                const period: PeriodModel = {
                    day: null,
                    periods: []
                };
                if(teachingDay.selected) {
  
                    period.day = teachingDay.day;
                    for(let i = 1; i <= action.numberOfPeriods; i++) {
                        period.periods.push('P' + i as any)
                    }

                }
                return period;
            })
            classAndGroup.periods = periodsArr
            return classAndGroup
        })
        return {
            ...stateCopy,
            teachingDays: {
                ...stateCopy.teachingDays,
                classesAndGroupItems: updatedClassesAndGroups
            }
            // classesAndGroups: updatedClassesAndGroups
        }
    }),
    on(fetchClassesAndGroupsSuccess, (state, action)=> {
        return {
            ...state,
            teachingDays: {
                ...state.teachingDays,
                classesAndGroupItems: [
                    ...action.classesAndGroups
                ]
            }
        }
    }),
    on(toggleClassesGroupActive, (state, action)=> {
        const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
        const groupsState = stateCopy.teachingDays.classesAndGroupItems;
        const classGroupIdx = groupsState.findIndex(
            classGroupItem => classGroupItem.id === action.classesGroup.id
        );
        const teachingDayIdx = groupsState[classGroupIdx].teachingDays.findIndex(teachingDay=> teachingDay.day === action.day.day);
        groupsState[classGroupIdx].teachingDays[teachingDayIdx].selected = !groupsState[classGroupIdx].teachingDays[teachingDayIdx].selected;

        return {
            ...state,
            teachingDays: {
                ...state.teachingDays,
                classesAndGroupItems: groupsState
            }
        }
    }),
    on(addClassesGroup, (state, action) => {
        const prevGroupLength = state.teachingDays.classesAndGroupItems.length;
        const groupName = `Default-${prevGroupLength + 1}`;
        const classes = [];
        console.log(state.teachingDays.classesAndGroupItems);
        const teachingDays: TeachingDay[] = [
          { day: 'Mon', selected: false },
          { day: 'Tue', selected: false },
          { day: 'Wed', selected: false },
          { day: 'Thu', selected: false },
          { day: 'Fri', selected: false },
          { day: 'Sat', selected: false },
          { day: 'Sun', selected: false }
        ];
        const newGroupObj: ClassGroupModel = {
            id: action.generatedGroupId,
            groupName,
            classes,
            teachingDays
        }
        const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
        stateCopy.teachingDays.classesAndGroupItems.push(newGroupObj);
        return stateCopy;
      }),
    on(reassignClass, (state, action) => {
        const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
        const groupsState = stateCopy.teachingDays.classesAndGroupItems;
        console.log(action.classesGroup, groupsState)
        const groupIdx = groupsState.findIndex(groupItem => groupItem.id === action.classesGroup.id);
        const clickedClassIdx = groupsState[groupIdx].classes.findIndex(classItem => classItem.id === action.class.id);
        if(clickedClassIdx > -1) {
            groupsState[groupIdx].classes.splice(clickedClassIdx, 1)
            if(groupsState[groupIdx].classes.length === 0) {
                console.log(groupsState);
                groupsState.splice(groupIdx, 1)
            }
        }else {
            groupsState[groupIdx].classes.push(action.class)
        }
        const adjustedGroups = clearClassOffGroups(action.class, groupsState, action.classesGroup)
        return {
            ...state,
            teachingDays: {
                ...state.teachingDays,
                classesAndGroupItems: adjustedGroups
            }
        }
    }),
    on(toggleSelectedDay, (state, action)=> {
        const dayIdx = state.teachingDays.items.findIndex(dayItem => dayItem.day === action.day.day);
        const stateCopy: TeachingDay[] = JSON.parse(JSON.stringify(state.teachingDays.items));
        stateCopy[dayIdx].selected = !stateCopy[dayIdx].selected
        return {
            ...state,
            teachingDays: {
                ...state.teachingDays,
                items: stateCopy
            }
        }
    }),
    on(setDefaultTeachingDays, (state, action)=> {
        const stateCopy: TeachingDay[] = JSON.parse(JSON.stringify(state.teachingDays.items));
        for(let i = 0; i < 5; i++) {
            stateCopy[i].selected = true;
        }
        return {
            ...state,
            teachingDays: {
                ...state.teachingDays,
                items: stateCopy
            }
        }
    }),
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