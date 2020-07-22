import { combineReducers } from '@ngrx/store';
import { consoleClassesReducer } from './console-classes.reducer';

export const consoleReducer = combineReducers({
  consoleClasses: consoleClassesReducer
})
