import { modalReducer } from "./subject-modal.reducer";
import { combineReducers } from '@ngrx/store';
import { subjectsSubReducer } from './subjects.reducer';
import { classesReducer } from './classes.reducer';


export const subjectsReducer = combineReducers({
  modal: modalReducer,
  subjects: subjectsSubReducer,
  classes: classesReducer
})
