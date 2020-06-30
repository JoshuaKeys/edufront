import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectAll } from '../reducers/holidays-reducer';
import { SelectedPeriodModel } from '../../models/selected-period.model';
import { PeriodModel } from '../../models/period.model';
import { SelectedPeriods } from '../../models/selected-periods.model';
import { HolidayCreateModel } from '../../models/holiday-create.model';
import { VacationCreateModel } from '../../models/vacation-create.model';
import { TermCreateModel } from '../../models/term-create.model';
import { TermDetailsDtoModel } from '../../models/term-details-dto.model';
import { CalendarCreateModel } from '../../models/calendar-create.model';
import { getOrphanedClasses } from '../../utilities';

const calendarFeatureState = createFeatureSelector<CalendarStateModel>(
  'calendar'
);

export const selectCalendarModalState = createSelector(
  calendarFeatureState,
  feat => feat.modal
);
export const selectPreviewState = createSelector(
  calendarFeatureState,
  feat => feat.preview
);
export const selectCalendar = createSelector(calendarFeatureState, feat => {
  return feat.calendarData;
});
export const selectTeaching = createSelector(
  calendarFeatureState,
  feat => feat.teaching
);
export const selectAllHolidays = createSelector(calendarFeatureState, feat =>
  selectAll(feat.holidays.holidayList)
);
export const selectEditState = createSelector(
  calendarFeatureState,
  feat => feat.holidays.holidayEdit
);

export const selectTeachingDays = createSelector(
  calendarFeatureState,
  feat => feat.teaching.teachingDays
);
export const selectClassesAndGroups = createSelector(
  calendarFeatureState,
  feat => feat.teaching.classesAndGroups
);
export const selectAllClasses = createSelector(
  calendarFeatureState,
  feat => feat.teaching.classes
);
export const getAllSelectedClassPeriods = createSelector(
  calendarFeatureState,
  feat => {
    return feat.teaching.classesAndGroups
      .map(classesGroup => {
        const selectedPeriods: PeriodModel[] = classesGroup.periods
          ? classesGroup.periods.filter(period => period.periodSelected)
          : [];
        if (selectedPeriods.length > 0) {
          return {
            groupId: classesGroup.id,
            periods: selectedPeriods
          } as SelectedPeriods;
        } else {
          return null;
        }
      })
      .filter(items => items);
  }
);
export const selectPeriodSelected = createSelector(
  calendarFeatureState,
  feat => {
    return feat.teaching.selection;
  }
);
export const selectOrphanedClasses = createSelector(
  calendarFeatureState, feat => {
    const allClasses = feat.teaching.classes;
    const classesAndGroups = feat.teaching.classesAndGroups;
    return getOrphanedClasses(allClasses, classesAndGroups).sort((classA, classB)=> {
      return classA.grade - classB.grade
    });
  }
)
export const selectCreateCalendarData = createSelector(
  calendarFeatureState,
  feat => {
      if(Object.keys(feat.calendarData).length >= 4) {
        const holidays: HolidayCreateModel[] = selectAll(
            feat.holidays.holidayList
          ).map(holiday => {
            return {
              name: holiday.name,
              isNationalHoliday: holiday.nationalHoliday,
              date: holiday.date,
              nationalCalendarId: holiday.nationalCalendarId
                ? holiday.nationalCalendarId
                : undefined
            };
          });
      
          const vacations: VacationCreateModel[] = feat.calendarData.vacations.map(
            vacation => ({
              vacationStart: vacation.startDate,
              vacationEnd: vacation.endDate,
              vacationName: vacation.vacationName
            })
          );
      
          const termDetailsDto: TermDetailsDtoModel[] = feat.calendarData.termsAndDates.map(
            termAndDate => {
              return {
                termTitle: termAndDate.termName,
                termStart: termAndDate.startDate,
                termEnd: termAndDate.endDate
              }
            }
          );
          let schoolId = localStorage.getItem('schoolId');
          schoolId = schoolId ? schoolId :undefined;
          const term: TermCreateModel = {
              acadimicStart: feat.calendarData.currentAcademicYear.startDate,
              acadimicEnd: feat.calendarData.currentAcademicYear.endDate,
              noOfTerm: feat.calendarData.schoolTerms,
              schoolId: schoolId,
              termDetailsDtos: termDetailsDto,
          };
          return {
              holidays,
              term,
              vacations
          } as CalendarCreateModel;
      }
    return null
  }
);
