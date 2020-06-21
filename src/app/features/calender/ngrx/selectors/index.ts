import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectAll } from '../reducers/holidays-reducer';

const calendarFeatureState = createFeatureSelector<CalendarStateModel>('calendar');

export const selectCalendarModalState = createSelector(calendarFeatureState, feat => feat.modal);
export const selectPreviewState = createSelector(calendarFeatureState, feat => feat.preview);
export const selectCalendar = createSelector(calendarFeatureState, feat => {
    return feat.calendarData
});
export const selectAllHolidays = createSelector(calendarFeatureState, feat=>  selectAll(feat.holidays.holidayList));
export const selectEditState = createSelector(calendarFeatureState, feat => feat.holidays.holidayEdit);

export const selectTeachingDays = createSelector(calendarFeatureState, feat=> feat.teachingDays);
export const selectClassesAndGroups = createSelector(calendarFeatureState, feat => feat.classesAndGroups)
export const selectAllClasses = createSelector(calendarFeatureState, feat => feat.classes);