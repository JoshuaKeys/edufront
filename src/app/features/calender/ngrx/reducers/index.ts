import { combineReducers } from '@ngrx/store';
import { calenderModalReducer } from './calender-modal.reducer';
import { previewReducer } from './preview.reducer';
import { calendarReducer } from './calendar.reducer';

export const calenderReducer = combineReducers({
    modal: calenderModalReducer,
    preview: previewReducer,
    calendarData: calendarReducer
});