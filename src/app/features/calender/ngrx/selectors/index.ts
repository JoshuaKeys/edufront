import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectAll } from '../reducers/holidays-reducer';
import { SelectedPeriodModel } from '../../models/selected-period.model';
import { PeriodModel } from '../../models/period.model';
import { SelectedPeriods } from '../../models/selected-periods.model';

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
        const selectedPeriods: PeriodModel[] = classesGroup.periods ? classesGroup.periods.filter(period => period.periodSelected) :[];
        if(selectedPeriods.length > 0) {
            return {
                groupId: classesGroup.id,
                periods: selectedPeriods
            } as SelectedPeriods
        }else {
            return null;
        }
    }).filter(items => items)
    
});
export const selectPeriodSelected = createSelector(calendarFeatureState, feat => {
    return feat.teaching.selection;
})