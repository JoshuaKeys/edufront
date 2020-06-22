import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectAll } from '../reducers/holidays-reducer';

const calendarFeatureState = createFeatureSelector<CalendarStateModel>('calendar');

export const selectCalendarModalState = createSelector(calendarFeatureState, feat => feat.modal);
export const selectPreviewState = createSelector(calendarFeatureState, feat => feat.preview);
export const selectCalendar = createSelector(calendarFeatureState, feat => {
    return feat.calendarData
});
export const selectTeaching = createSelector(calendarFeatureState, feat=> feat.teaching)
export const selectAllHolidays = createSelector(calendarFeatureState, feat=>  selectAll(feat.holidays.holidayList));
export const selectEditState = createSelector(calendarFeatureState, feat => feat.holidays.holidayEdit);

export const selectTeachingDays = createSelector(calendarFeatureState, feat=> feat.teaching.teachingDays);
export const selectClassesAndGroups = createSelector(calendarFeatureState, feat => feat.teaching.classesAndGroups)
export const selectAllClasses = createSelector(calendarFeatureState, feat => feat.teaching.classes);
export const getAllSelectedClassPeriods = createSelector(calendarFeatureState, feat => {
    return feat.teaching.classesAndGroups.map(classesGroup => {
        const selectedTeachingDays = classesGroup.teachingDays.filter(teachingDay => teachingDay.periodSelected);
        if(selectedTeachingDays.length > 0) {
            return {
                groupId: classesGroup.id,
                teachingDays: selectedTeachingDays
            }
        }else {
            return null;
        }
    }).filter(items => items.teachingDays)
})