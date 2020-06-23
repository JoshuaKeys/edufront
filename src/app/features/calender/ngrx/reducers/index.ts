import { combineReducers } from '@ngrx/store';
import { calenderModalReducer } from './calender-modal.reducer';
import { previewReducer } from './preview.reducer';
import { calendarReducer } from './calendar.reducer';
import { holidayReducer } from './holidays-reducer'
import { teachingReducer } from './teaching.reducer';
import { classesAndGroupsReducer } from './classes-and-groups.reducer';
import { classesReducer } from './classes.reducer';

export const calenderReducer = combineReducers({
    modal: calenderModalReducer,
    preview: previewReducer,
    calendarData: calendarReducer,
    holidays: holidayReducer,
    teaching: teachingReducer,
});