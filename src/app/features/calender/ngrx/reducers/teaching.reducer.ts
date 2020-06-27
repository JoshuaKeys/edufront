import { createReducer, on } from '@ngrx/store';
import { TeachingDay } from '../../models/teaching-day.model';
import {
  toggleSelectedDay,
  setDefaultTeachingDays,
  getAllClassesResponse,
  fetchClassesAndGroupsSuccess,
  toggleClassesGroupActive,
  reassignClass,
  setNumberOfPeriods,
  assignPeriodsToTeachingDates,
  selectTeachingDay,
  addClassesGroup,
  addPeriodsToGroup,
  updateSelectedPeriods,
  setStartTime,
  setAllStartTime,
  selectStartTime
} from '../actions/calendar.actions';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { ClassGroupModel } from '../../models/class-group.model';
import { clearClassOffGroups, generatePeriodFromNumber } from '../../utilities';
import { PeriodModel } from '../../models/period.model';

const initialState: TeachingStateModel = {
  teachingDays: [
    { day: 'Mon', selected: false },
    { day: 'Tue', selected: false },
    { day: 'Wed', selected: false },
    { day: 'Thu', selected: false },
    { day: 'Fri', selected: false },
    { day: 'Sat', selected: false },
    { day: 'Sun', selected: false }
  ],
  classes: [],
  classesAndGroups: [],
  periods: [],
  selection: {
    selectionState:  'ended',
    periodSelected: undefined
  }
};
export const teachingReducer = createReducer(
  initialState,
  on(fetchClassesAndGroupsSuccess, (state, action) => {
    return {
      ...state,
      classesAndGroups: action.classesAndGroups
    };
  }),
  on(toggleClassesGroupActive, (state, action) => {
    const classGroupIdx = state.classesAndGroups.findIndex(
      classGroupItem => classGroupItem.id === action.classesGroup.id
    );
    const stateCopy: ClassGroupModel[] = JSON.parse(
      JSON.stringify(state.classesAndGroups)
    );
    const teachingDayIdx = stateCopy[classGroupIdx].teachingDays.findIndex(
      teachingDay => teachingDay.day === action.day.day
    );
    stateCopy[classGroupIdx].teachingDays[teachingDayIdx].selected = !stateCopy[
      classGroupIdx
    ].teachingDays[teachingDayIdx].selected;
    return {
      ...state,
      classesAndGroups: stateCopy
    };
  }),
  on(reassignClass, (state, action) => {
    const stateCopy: ClassGroupModel[] = JSON.parse(
      JSON.stringify(state.classesAndGroups)
    );

    const groupIdx = stateCopy.findIndex(
      groupItem => groupItem.id === action.classesGroup.id
    );
    const clickedClassIdx = stateCopy[groupIdx].classes.findIndex(
      classItem => classItem.id === action.class.id
    );
    if (clickedClassIdx > -1) {
      stateCopy[groupIdx].classes.splice(clickedClassIdx, 1);
      if (stateCopy[groupIdx].classes.length === 0) {
        stateCopy.splice(groupIdx, 1);
      }
    } else {
      stateCopy[groupIdx].classes.push(action.class);
    }
    const adjustedGroups = clearClassOffGroups(
      action.class,
      stateCopy,
      action.classesGroup
    );
    return {
      ...state,
      classesAndGroups: adjustedGroups
    };
  }),
  on(addPeriodsToGroup, (state, action) => {
    const stateCopy: TeachingStateModel = JSON.parse(JSON.stringify(state));
    const groupIdx = stateCopy.classesAndGroups.findIndex(
      classesAndGroup => classesAndGroup.id === action.generatedGroupId
    );
    const periods: PeriodModel[] = [];
    stateCopy.teachingDays.forEach(teachingDay => {
      periods.push({
        day: teachingDay.day,
        periods: [],
        startTime: '0',
        periodDuration: '0',
        intervaBtwPeriods: '0',
        breaks: [],
        assembly: { name: '', startingAt: '', duration: '' }
      });
    })
 
    stateCopy.classesAndGroups[groupIdx].periods = periods;
    return stateCopy;
  }),

  on(setAllStartTime, (state, action)=> {
    const stateCopy: TeachingStateModel = JSON.parse(JSON.stringify(state));
    const updatedClassesAndGroups = stateCopy.classesAndGroups.map(classesAndGroup => {
      const updatedPeriods = classesAndGroup.periods.map(period =>{
        period.startTime = action.startTime
        return period;
      })
      classesAndGroup.periods = updatedPeriods;
      return classesAndGroup;
    })
    stateCopy.classesAndGroups = updatedClassesAndGroups;
    return stateCopy;
  }),
  on(addClassesGroup, (state, action) => {
    const prevGroupLength = state.classesAndGroups.length;
    const groupName = `Default-${prevGroupLength + 1}`;
    const classes = [];
    const teachingDays: TeachingDay[] = [
      { day: 'Mon', selected: false },
      { day: 'Tue', selected: false },
      { day: 'Wed', selected: false },
      { day: 'Thu', selected: false },
      { day: 'Fri', selected: false },
      { day: 'Sat', selected: false },
      { day: 'Sun', selected: false }
    ];
    const stateCopy: TeachingStateModel = JSON.parse(JSON.stringify(state));
    const periodsArr: PeriodModel[] = teachingDays.map(teachingDay => {
      const period: PeriodModel = {
        day: teachingDay.day,
        periods: [],
        startTime: '0',
        periodDuration: '0',
        intervaBtwPeriods: '0',
        breaks: [],
        assembly: { name: '', startingAt: '', duration: '' }
      };
      return period;
    });


    const newGroupObj: ClassGroupModel = {
      id: action.generatedGroupId,
      groupName,
      classes,
      teachingDays,
      periods: periodsArr
    };

    stateCopy.classesAndGroups.push(newGroupObj);
    return stateCopy;
  }),
  on(getAllClassesResponse, (state, action) => {
    return {
      ...state,
      classes: action.classes
    };
  }),
  on(setDefaultTeachingDays, (state, action) => {
    const stateCopy: TeachingDay[] = JSON.parse(
      JSON.stringify(state.teachingDays)
    );
    for (let i = 0; i < 5; i++) {
      stateCopy[i].selected = true;
    }
    return {
      ...state,
      teachingDays: stateCopy
    };
  }),
  on(toggleSelectedDay, (state, action) => {
    const stateCopy: TeachingDay[] = JSON.parse(
      JSON.stringify(state.teachingDays)
    );
    const dayIdx = stateCopy.findIndex(
      dayItem => dayItem.day === action.day.day
    );
    stateCopy[dayIdx].selected = !stateCopy[dayIdx].selected;
    return {
      ...state,
      teachingDays: stateCopy
    };
  }),
  on(setNumberOfPeriods, (state, action) => {
    const stateCopy: TeachingStateModel = JSON.parse(JSON.stringify(state));

    const periodsArr = [];
    for (let i = 1; i <= action.numberOfPeriods; i++) {
      periodsArr.push('P' + i);
    }
    const periodsObjs = stateCopy.teachingDays
      .filter(teachingDay => teachingDay.selected)
      .map(teachingDay => {
        return {
          day: teachingDay.day,
          periods: periodsArr,
          startTime: '',
          periodDuration: '0',
          intervaBtwPeriods: '0',
          breaks: [],
          assembly: { name: '', startingAt: '', duration: '' }
        };
      });
    // const classesGroup = stateCopy.classesAndGroups[0].
    return {
      ...state,
      periods: periodsObjs
    };
  }),
  on(assignPeriodsToTeachingDates, (state, action) => {
    const stateCopy: TeachingStateModel = JSON.parse(JSON.stringify(state));
    const updatedClassesAndGroups = stateCopy.classesAndGroups.map(
      classAndGroup => {
        const periodsArr: PeriodModel[] = classAndGroup.teachingDays.map(
          teachingDay => {
            const period: PeriodModel = {
              day: null,
              periods: [],
              startTime: '0',
              periodDuration: '0',
              intervaBtwPeriods: '0',
              breaks: [],
              assembly: { name: '', startingAt: '', duration: '' }
            };
            if (teachingDay.selected) {
              period.day = teachingDay.day;
              for (let i = 1; i <= action.numberOfPeriods; i++) {
                period.periods.push(('P' + i) as any);
              }
            } else {
              period.day = teachingDay.day;
            }
            return period;
          }
        );
        classAndGroup.periods = periodsArr;
        return classAndGroup;
      }
    );
    return {
      ...stateCopy,
      classesAndGroups: updatedClassesAndGroups
    };
  }),
  on(selectStartTime, (state, action)=> {
    let stateCopy: TeachingStateModel = JSON.parse(JSON.stringify(state));
    if(stateCopy.selection.selectionState === 'ended') {
      stateCopy = clearStartTimes(stateCopy);
      stateCopy.selection.selectionState = 'started';
    }

      const updatedClassesAndGroups = stateCopy.classesAndGroups.map(
        classAndGroup => {
          const periods = classAndGroup.periods.map(period => {
            if (
              period.day === action.day.day &&
              classAndGroup.id === action.classGroup.id
            ) {
              if (period.startTimeSelected) {
                period.startTimeSelected = false;
              } else {
                period.startTimeSelected = true;
              }
            }
            return period;
          });
          classAndGroup.periods = periods;
          return classAndGroup;
        }
      );
      return {
        ...stateCopy,
        classesAndGroups: updatedClassesAndGroups
      };
  }),
  on(selectTeachingDay, (state, action) => {
    let stateCopy: TeachingStateModel = JSON.parse(JSON.stringify(state));
    if(stateCopy.selection.selectionState === 'ended') {
      // clear all previous selections
      stateCopy = clearClassesAndGroups(stateCopy)
      stateCopy.selection.selectionState = 'started';
      delete stateCopy.selection.periodSelected
    }

    const updatedClassesAndGroups = stateCopy.classesAndGroups.map(
      classAndGroup => {
        const periods = classAndGroup.periods.map(period => {
          if (
            period.day === action.day.day &&
            classAndGroup.id === action.classGroup.id
          ) {
            if (period.periodSelected) {
              period.periodSelected = false;
            } else {
              period.periodSelected = true;
            }
          }
          return period;
        });
        classAndGroup.periods = periods;
        return classAndGroup;
      }
    );
    return {
      ...stateCopy,
      classesAndGroups: updatedClassesAndGroups
    };
  }),
  on(updateSelectedPeriods, (state, action) => {
    const { updateTo, selectedPeriods } = action;
    const stateCopy: TeachingStateModel = JSON.parse(JSON.stringify(state));
    for (let i = 0; i < action.selectedPeriods.length; i++) {
      for (let j = 0; j < stateCopy.classesAndGroups.length; j++) {
        if (
          action.selectedPeriods[i].groupId ===
          stateCopy.classesAndGroups[j].id
        ) {
          for (
            let k = 0;
            k < action.selectedPeriods[i].periods.length;
            k++
          ) {
            let periodDayIdx = stateCopy.classesAndGroups[
              j
            ].periods.findIndex(
              period =>
                period.day ===
                action.selectedPeriods[i].periods[k].day
            );
            stateCopy.classesAndGroups[j].periods[
              periodDayIdx
            ].periods = generatePeriodFromNumber(updateTo);
          }
        }
      }
    }
    stateCopy.selection.selectionState = 'ended';
    stateCopy.selection.periodSelected = updateTo;
    return stateCopy;
  })
);

function clearClassesAndGroups(stateCopy: TeachingStateModel) {

  const updatedClassesAndGroups = stateCopy.classesAndGroups.map(
    classAndGroup => {
      const clearedPeriods = classAndGroup.periods.map(period => {
        period.periodSelected = false
        return period;
      })
      classAndGroup.periods = clearedPeriods;
      return classAndGroup;
    }
  );
  stateCopy.classesAndGroups = updatedClassesAndGroups;
  return stateCopy;
}
function clearStartTimes(stateCopy: TeachingStateModel) {

  const updatedClassesAndGroups = stateCopy.classesAndGroups.map(
    classAndGroup => {
      const clearedPeriods = classAndGroup.periods.map(period => {
        period.startTimeSelected = false
        return period;
      })
      classAndGroup.periods = clearedPeriods;
      return classAndGroup;
    }
  );
  stateCopy.classesAndGroups = updatedClassesAndGroups;
  return stateCopy;
}