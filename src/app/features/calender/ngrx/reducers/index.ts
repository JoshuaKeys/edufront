import { combineReducers } from '@ngrx/store';
import { calenderModalReducer } from './calender-modal.reducer';

export const calenderReducer = combineReducers({
    modal: calenderModalReducer
});