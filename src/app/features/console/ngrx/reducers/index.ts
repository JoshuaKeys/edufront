import { combineReducers, createReducer } from '@ngrx/store';
import { consoleClassesReducer } from './console-classes/console-classes.reducer'
import { classesReducer } from './classes.reducer';

// const consoleClassesReducer = combineReducers({
//   groups: consoleGroupsReducer,
//   sections: consoleSectionsReducer
// })
export const consoleReducer = combineReducers({
  consoleClasses: consoleClassesReducer,
})
