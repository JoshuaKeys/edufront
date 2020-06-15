import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CalendarStateModel } from '../../models/calender-state.model';

const calendarFeatureState = createFeatureSelector<CalendarStateModel>('calendar');

export const selectCalendarModalState = createSelector(calendarFeatureState, feat => feat.modal);