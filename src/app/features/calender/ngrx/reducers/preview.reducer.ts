import { createReducer, on } from '@ngrx/store';
import { PreviewModel } from '../../models/preview.model';
import { TermsAndDates } from '../../models/terms-and-date.model';
import {
  setPreviewAcademicYearStartDate,
  setPreviewAcademicYearEndDate,
  setSchoolTerms,
  toggleSelectedTerms,
  setTermStartDate,
  initializeTermsAndDates,
  setTermEndDate,
  setTermName,
  initializeVacations,
  addVacation,
  setVacationEndDate,
  setVacationName,
  setVacationStartDate,
  toggleSelectedDay,
  setDefaultTeachingDays,
  fetchClassesAndGroupsSuccess,
  toggleClassesGroupActive,
  reassignClass,
  setNumberOfPeriods,
  assignPeriodsToTeachingDates,
  addClassesGroup,
  removeVacation,
  selectTeachingDay,
  updateSelectedPeriods,
  addPeriodsToGroup,
  setStartTime,
  setAllStartTime,
  selectStartTime,
  setPeriodDuration,
  setPeriodInterval,
  setAssemblyData
} from '../actions/calendar.actions';
import { VacationModel } from '../../models/vacation.model';
import { TeachingDay } from '../../models/teaching-day.model';
import { clearClassOffGroups, generatePeriodFromNumber } from '../../utilities';
import { ClassGroupModel } from '../../models/class-group.model';
import { PeriodModel } from '../../models/period.model';
const initialState: PreviewModel = {
  datePreview: {
    route: '/calendar/dates-of-academic-year'
  },
  schoolTerms: {
    route: '/calendar/school-terms-question'
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
      { day: 'Mon', selected: false },
      { day: 'Tue', selected: false },
      { day: 'Wed', selected: false },
      { day: 'Thu', selected: false },
      { day: 'Fri', selected: false },
      { day: 'Sat', selected: false },
      { day: 'Sun', selected: false }
    ]
  },
  periods: {
    route: '/calendar/same-periods-for-classes-question'
  }
};
export const previewReducer = createReducer(
  initialState,
  on(updateSelectedPeriods, (state, action) => {
    const { updateTo, selectedPeriods } = action;
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    for (let i = 0; i < action.selectedPeriods.length; i++) {
      for (let j = 0; j < stateCopy.teachingDays.classesAndGroupItems.length; j++) {
        if (
          action.selectedPeriods[i].groupId ===
          stateCopy.teachingDays.classesAndGroupItems[j].id
        ) {
          for (
            let k = 0;
            k < action.selectedPeriods[i].periods.length;
            k++
          ) {
            let periodDayIdx = stateCopy.teachingDays.classesAndGroupItems[
              j
            ].periods.findIndex(
              period =>
                period.day ===
                action.selectedPeriods[i].periods[k].day
            );
            stateCopy.teachingDays.classesAndGroupItems[j].periods[
              periodDayIdx
            ].periods = generatePeriodFromNumber(updateTo);
          }
        }
      }
    }
    return stateCopy;
  }),
  on(selectTeachingDay, (state, action) => {
    let stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));

    const updatedClassesAndGroups = stateCopy.teachingDays.classesAndGroupItems.map(
      classAndGroupItem => {
        const periods = classAndGroupItem.periods.map(period => {
          if (
            period.day === action.day.day &&
            classAndGroupItem.id === action.classGroup.id
          ) {
            if (period.periodSelected) {
              period.periodSelected = false;
            } else {
              period.periodSelected = true;
            }
          }
          return period;
        });
        classAndGroupItem.periods = periods;
        return classAndGroupItem;
      }
    );
    return {
      ...stateCopy,
      teachingDays: {
        ...stateCopy.teachingDays,
        classesAndGroupItems: updatedClassesAndGroups
      }
    };
  }),
  on(setNumberOfPeriods, (state, action) => {
    const teachingDays = state.teachingDays.items;
    const periodsArr = [];
    const period = {
      day: null,
      periods: [],
      startTime: '',
      periodDuration: '',
      intervaBtwPeriods: '',
      breaks: [],
      assembly: { name: '', startingAt: '', duration: '' }
    };
    for (let i = 1; i <= action.numberOfPeriods; i++) {
      period.periods.push('P' + i);
    }
    const periodsObjs = teachingDays
      .filter(teachingDay => teachingDay.selected)
      .map(teachingDay => {
        return {
          ...period,
          day: teachingDay.day
        };
      });
    const classesAndGroupsCopy: ClassGroupModel[] = JSON.parse(
      JSON.stringify(state.teachingDays.classesAndGroupItems)
    );
    console.log(classesAndGroupsCopy);
    return {
      ...state,
      periods: {
        ...state.periods,
        items: periodsObjs
      }
    };
  }),
  on(setStartTime, (state, action)=> {
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    const updatedClassesAndGroups = stateCopy.teachingDays.classesAndGroupItems.map(classesAndGroup => {
      const updatedPeriods = classesAndGroup.periods.map((period: PeriodModel) => {
        if(period.startTimeSelected) {
          period.startTime = action.startTime
          period.startTimeSelected = false;
        }
        return period;
      })
      classesAndGroup.periods = updatedPeriods;
      return classesAndGroup;
    })
    stateCopy.teachingDays.classesAndGroupItems = updatedClassesAndGroups;
    return stateCopy;
  }),
  on(selectStartTime, (state, action)=> {
    let stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
      const updatedClassesAndGroups = stateCopy.teachingDays.classesAndGroupItems.map(
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
        teachingDays: {
          ...stateCopy.teachingDays,
          classesAndGroupItems: updatedClassesAndGroups
        }
      };
  }),
  on(setAllStartTime, (state, action)=> {
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    const updatedClassesAndGroups = stateCopy.teachingDays.classesAndGroupItems.map(classesAndGroup => {
      const updatedPeriods = classesAndGroup.periods.map(period =>{
        period.startTime = action.startTime
        return period;
      })
      classesAndGroup.periods = updatedPeriods;
      return classesAndGroup;
    })
    stateCopy.teachingDays.classesAndGroupItems = updatedClassesAndGroups;
    return stateCopy;
  }),
  on(assignPeriodsToTeachingDates, (state, action) => {
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    const updatedClassesAndGroups = stateCopy.teachingDays.classesAndGroupItems.map(
      classAndGroup => {
        const periodsArr: PeriodModel[] = classAndGroup.teachingDays.map(
          teachingDay => {
            const period: PeriodModel = {
              day: teachingDay.day,
              periods: [],
              startTime: '',
              periodDuration: '',
              intervaBtwPeriods: '',
              breaks: [],
              assembly: { name: '', startingAt: '', duration: '' }
            };
            if (teachingDay.selected) {
              period.day = teachingDay.day;
              for (let i = 1; i <= action.numberOfPeriods; i++) {
                period.periods.push(('P' + i) as any);
              }
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
      teachingDays: {
        ...stateCopy.teachingDays,
        classesAndGroupItems: updatedClassesAndGroups
      }
      // classesAndGroups: updatedClassesAndGroups
    };
  }),
  on(fetchClassesAndGroupsSuccess, (state, action) => {
    return {
      ...state,
      teachingDays: {
        ...state.teachingDays,
        classesAndGroupItems: [...action.classesAndGroups]
      }
    };
  }),
  on(addPeriodsToGroup, (state, action) => {
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    const groupIdx = stateCopy.teachingDays.classesAndGroupItems.findIndex(
      classesAndGroup => classesAndGroup.id === action.generatedGroupId
    );
    const periods: PeriodModel[] = [];
    stateCopy.teachingDays.items.forEach(teachingDay => {
      periods.push({
        day: teachingDay.day,
        periods: [],
        startTime: '',
        periodDuration: '',
        intervaBtwPeriods: '',
        breaks: [],
        assembly: { name: '', startingAt: '', duration: '' }
      });
    })
 
    stateCopy.teachingDays.classesAndGroupItems[groupIdx].periods = periods;
    return stateCopy;
  }),
  on(setPeriodDuration, (state, action)=> {
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    const updatedClassesAndGroups = stateCopy.teachingDays.classesAndGroupItems.map((classesGroup: ClassGroupModel)=> {
      const updatedPeriods = classesGroup.periods.map(period => {
        period.periodDuration = action.periodDuration + '';
        return period;
      })
      classesGroup.periods = updatedPeriods;
      return classesGroup;
    })
    stateCopy.teachingDays.classesAndGroupItems = updatedClassesAndGroups;
    return stateCopy;
  }),
  on(setPeriodInterval, (state, action)=> {
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    const updatedClassesAndGroups = stateCopy.teachingDays.classesAndGroupItems.map((classesGroup: ClassGroupModel)=> {
      const updatedPeriods = classesGroup.periods.map(period => {
        period.intervaBtwPeriods = action.periodInterval + '';
        return period;
      })
      classesGroup.periods = updatedPeriods;
      return classesGroup;
    })
    stateCopy.teachingDays.classesAndGroupItems = updatedClassesAndGroups;
    return stateCopy;
  }),
  on(toggleClassesGroupActive, (state, action) => {
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    const groupsState = stateCopy.teachingDays.classesAndGroupItems;
    const classGroupIdx = groupsState.findIndex(
      classGroupItem => classGroupItem.id === action.classesGroup.id
    );
    const teachingDayIdx = groupsState[classGroupIdx].teachingDays.findIndex(
      teachingDay => teachingDay.day === action.day.day
    );
    groupsState[classGroupIdx].teachingDays[
      teachingDayIdx
    ].selected = !groupsState[classGroupIdx].teachingDays[teachingDayIdx]
      .selected;

    return {
      ...state,
      teachingDays: {
        ...state.teachingDays,
        classesAndGroupItems: groupsState
      }
    };
  }),
  on(setAssemblyData, (state, action)=> {
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    const updatedClassesAndGroups = stateCopy.teachingDays.classesAndGroupItems.map((classesGroup: ClassGroupModel)=> {
      const updatedPeriods = classesGroup.periods.map(period => {
        period.assembly[action.field] = action.value + '';
        return period;
      })
      classesGroup.periods = updatedPeriods;
      return classesGroup;
    })
    stateCopy.teachingDays.classesAndGroupItems = updatedClassesAndGroups;
    return stateCopy;
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
    };
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    stateCopy.teachingDays.classesAndGroupItems.push(newGroupObj);
    return stateCopy;
  }),
  on(reassignClass, (state, action) => {
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    const groupsState = stateCopy.teachingDays.classesAndGroupItems;
    console.log(action.classesGroup, groupsState);
    const groupIdx = groupsState.findIndex(
      groupItem => groupItem.id === action.classesGroup.id
    );
    const clickedClassIdx = groupsState[groupIdx].classes.findIndex(
      classItem => classItem.id === action.class.id
    );
    if (clickedClassIdx > -1) {
      groupsState[groupIdx].classes.splice(clickedClassIdx, 1);
      if (groupsState[groupIdx].classes.length === 0) {
        console.log(groupsState);
        groupsState.splice(groupIdx, 1);
      }
    } else {
      groupsState[groupIdx].classes.push(action.class);
    }
    const adjustedGroups = clearClassOffGroups(
      action.class,
      groupsState,
      action.classesGroup
    );
    return {
      ...state,
      teachingDays: {
        ...state.teachingDays,
        classesAndGroupItems: adjustedGroups
      }
    };
  }),
  on(toggleSelectedDay, (state, action) => {
    const dayIdx = state.teachingDays.items.findIndex(
      dayItem => dayItem.day === action.day.day
    );
    const stateCopy: TeachingDay[] = JSON.parse(
      JSON.stringify(state.teachingDays.items)
    );
    stateCopy[dayIdx].selected = !stateCopy[dayIdx].selected;
    return {
      ...state,
      teachingDays: {
        ...state.teachingDays,
        items: stateCopy
      }
    };
  }),
  on(setDefaultTeachingDays, (state, action) => {
    const stateCopy: TeachingDay[] = JSON.parse(
      JSON.stringify(state.teachingDays.items)
    );
    for (let i = 0; i < 5; i++) {
      stateCopy[i].selected = true;
    }
    return {
      ...state,
      teachingDays: {
        ...state.teachingDays,
        items: stateCopy
      }
    };
  }),
  on(setPreviewAcademicYearStartDate, (state, action) => {
    return {
      ...state,
      datePreview: {
        ...state.datePreview,
        startDate: action.startDate
      }
    };
  }),
  on(setPreviewAcademicYearEndDate, (state, action) => {
    return {
      ...state,
      datePreview: {
        ...state.datePreview,
        endDate: action.endDate
      }
    };
  }),
  on(toggleSelectedTerms, (state, action) => {
    let termsNumber = undefined;
    if (state.schoolTerms.termsNumber !== action.schoolTerms) {
      termsNumber = action.schoolTerms;
    }
    return {
      ...state,
      schoolTerms: {
        ...state.schoolTerms,
        termsNumber
      }
    };
  }),
  on(initializeTermsAndDates, (state, action) => {
    const schoolTerms = state.schoolTerms;
    let items: TermsAndDates[] = [];
    for (let i = 0; i < schoolTerms.termsNumber; i++) {
      items.push({
        termName: 'Term ' + (i + 1),
        startDate: '',
        endDate: ''
      });
    }
    return {
      ...state,
      termsNamesAndDates: {
        ...state.termsNamesAndDates,
        items
      }
    };
  }),
  on(initializeVacations, (state, action) => {
    let vacations: VacationModel[] = [];
    vacations.push({
      vacationName: 'Vacation 1',
      startDate: '',
      endDate: ''
    });
    return {
      ...state,
      termVacations: {
        ...state.termVacations,
        items: [...vacations]
      }
    };
  }),
  on(setTermStartDate, (state, action) => {
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    let item = stateCopy.termsNamesAndDates.items[action.idx];
    item.startDate = action.startDate;
    return stateCopy;
  }),
  on(setTermEndDate, (state, action) => {
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    let item = stateCopy.termsNamesAndDates.items[action.idx];
    item.endDate = action.endDate;
    return stateCopy;
  }),
  on(setTermName, (state, action) => {
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    let item = stateCopy.termsNamesAndDates.items[action.idx];
    item.termName = action.termName;
    return stateCopy;
  }),
  on(addVacation, (state, action) => {
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    stateCopy.termVacations.items.push({
      vacationName: `Vacation ${stateCopy.termVacations.items.length + 1}`,
      startDate: '',
      endDate: ''
    });
    return stateCopy;
  }),
  on(removeVacation, (state, action) => {
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    stateCopy.termVacations.items.splice(action.index, 1);
    return stateCopy;
  }),
  on(setVacationStartDate, (state, action) => {
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    let item = stateCopy.termVacations.items[action.idx];
    item.startDate = action.startDate;
    return stateCopy;
  }),
  on(setVacationEndDate, (state, action) => {
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    let item = stateCopy.termVacations.items[action.idx];
    item.endDate = action.endDate;
    return stateCopy;
  }),
  on(setVacationName, (state, action) => {
    const stateCopy: PreviewModel = JSON.parse(JSON.stringify(state));
    let item = stateCopy.termVacations.items[action.idx];
    item.vacationName = action.vacationName;
    return stateCopy;
  })
);
