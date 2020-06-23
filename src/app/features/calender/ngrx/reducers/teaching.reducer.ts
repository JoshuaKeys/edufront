import { createReducer, on } from '@ngrx/store';
import { TeachingDay } from '../../models/teaching-day.model';
import { 
    toggleSelectedDay,
    setDefaultTeachingDays,
    getAllClassesResponse,
    fetchClassesAndGroupsSuccess,
    toggleClassesGroupActive,
    reassignClass,
    setNumberOfPeriods, assignPeriodsToTeachingDates, selectTeachingDay, updateSelectedTeachingDays } from '../actions/calendar.actions';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { ClassGroupModel } from '../../models/class-group.model';
import { clearClassOffGroups } from '../../utilities';
import { PeriodModel } from '../../models/period.model';

const initialState: TeachingStateModel = {
    teachingDays: [
        {day: 'Mon', selected: false},
        {day: 'Tue', selected: false},
        {day: 'Wed', selected: false},
        {day: 'Thu', selected: false},
        {day: 'Fri', selected: false},
        {day: 'Sat', selected: false},
        {day: 'Sun', selected: false}
    ],
    classes: [],
    classesAndGroups: [],
    periods: []
}
export const teachingReducer = createReducer(initialState,
    on(fetchClassesAndGroupsSuccess, (state, action)=> {
        return {
            ...state,
            classesAndGroups: action.classesAndGroups
        }
    }),
    on(toggleClassesGroupActive, (state, action)=> {
        const classGroupIdx = state.classesAndGroups.findIndex(classGroupItem => classGroupItem.id === action.classesGroup.id);
        const stateCopy: ClassGroupModel[] = JSON.parse(JSON.stringify(state.classesAndGroups));
        const teachingDayIdx = stateCopy[classGroupIdx].teachingDays.findIndex(teachingDay=> teachingDay.day === action.day.day);
        stateCopy[classGroupIdx].teachingDays[teachingDayIdx].selected = !stateCopy[classGroupIdx].teachingDays[teachingDayIdx].selected;
        return {
            ...state,
            classesAndGroups: stateCopy
        }
    }),
    on(reassignClass, (state, action) => {
        const stateCopy: ClassGroupModel [] = JSON.parse(JSON.stringify(state.classesAndGroups));

        const groupIdx = stateCopy.findIndex(groupItem => groupItem.id === action.classesGroup.id);
        const clickedClassIdx = stateCopy[groupIdx].classes.findIndex(classItem => classItem.id === action.class.id);
        if(clickedClassIdx > -1) {
            stateCopy[groupIdx].classes.splice(clickedClassIdx, 1)
            if(stateCopy[groupIdx].classes.length === 0) {
                stateCopy.splice(groupIdx, 1)
            }
        }else {
            stateCopy[groupIdx].classes.push(action.class)
        }
        const adjustedGroups = clearClassOffGroups(action.class, stateCopy, action.classesGroup)
        return {
            ...state,
            classesAndGroups: adjustedGroups
        }
    }),
    on(getAllClassesResponse, (state, action)=> {
        return {
            ...state,
            classes: action.classes
        }
    }),  
    on(setDefaultTeachingDays, (state, action)=> {
        const stateCopy: TeachingDay[] = JSON.parse(JSON.stringify(state.teachingDays));
        for(let i = 0; i < 5; i++) {
            stateCopy[i].selected = true;
        }
        return {
            ...state,
            teachingDays: stateCopy
        }
    }),
    on(toggleSelectedDay, (state, action)=> {
        const stateCopy: TeachingDay[] = JSON.parse(JSON.stringify(state.teachingDays));
        const dayIdx = stateCopy.findIndex(dayItem => dayItem.day === action.day.day);
        stateCopy[dayIdx].selected = !stateCopy[dayIdx].selected;
        return {
            ...state,
            teachingDays: stateCopy
        }
    }),
    on(setNumberOfPeriods, (state, action)=> {
        const stateCopy: TeachingStateModel = JSON.parse(JSON.stringify(state));

        const periodsArr = [];
        for(let i = 1; i <= action.numberOfPeriods; i++) {
            periodsArr.push('P' + i)
        }
        const periodsObjs = stateCopy.teachingDays.filter(teachingDay => teachingDay.selected)
            .map(teachingDay=> {
                return {
                    day: teachingDay.day,
                    periods: periodsArr
                }
            })
        // const classesGroup = stateCopy.classesAndGroups[0].
        return {
            ...state,
            periods:  periodsObjs
        }
    }),
    on(assignPeriodsToTeachingDates, (state, action)=> {
        const stateCopy: TeachingStateModel = JSON.parse(JSON.stringify(state));
        const updatedClassesAndGroups = stateCopy.classesAndGroups.map(classAndGroup=> {
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
            classesAndGroups: updatedClassesAndGroups
        }
    }),
    on(selectTeachingDay, (state, action)=> {
        const stateCopy: TeachingStateModel = JSON.parse(JSON.stringify(state));
        const updatedClassesAndGroups = stateCopy.classesAndGroups.map(classAndGroup=> {
            const teachingDaysArr = classAndGroup.teachingDays.map(teachingDay=> {
                if(teachingDay.day === action.day.day && classAndGroup.id === action.classGroup.id) {
                    if(teachingDay.periodSelected) {
                        teachingDay.periodSelected = false
                    }else {
                        teachingDay.periodSelected = true;
                    }
                }
                
                return teachingDay
            })
            classAndGroup.teachingDays = teachingDaysArr;
            return classAndGroup
        })
        return {
            ...stateCopy,
            classesAndGroups: updatedClassesAndGroups
        }
    }),
    on(updateSelectedTeachingDays, (state, action)=> {
        const {updateTo, selectedTeachingDates} = action;
        const stateCopy:TeachingStateModel = JSON.parse(JSON.stringify(state));
        for(let i = 0; i < action.selectedTeachingDates.length; i++) {
            for(let j = 0; j < stateCopy.classesAndGroups.length; j++) {
                if(action.selectedTeachingDates[i].groupId === stateCopy.classesAndGroups[j].id) {
      
                    for(let k = 0; k < action.selectedTeachingDates[i].teachingDays.length; k++) {
                        let teachingDayIdx = stateCopy.classesAndGroups[j].teachingDays.findIndex(
                            teachingDay => teachingDay.day === action.selectedTeachingDates[i].teachingDays[k].day
                        );
                        console.log(stateCopy.classesAndGroups[j])
                        stateCopy.classesAndGroups[j].teachingDays[teachingDayIdx].period = updateTo;
                    }
                }
            }
        }

        return stateCopy;
    })
);