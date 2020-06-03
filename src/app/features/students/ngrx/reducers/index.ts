import { combineReducers } from '@ngrx/store';
import { studentsModalReducer } from './students-modal.reducer';
import { sortingReducer } from './sorting.reducer';
import { studentsAndClassesReducer } from './students-and-Classes.reducer';
import { studentsReducer as _studentsReducer } from './students.reducer'
import { classesReducer } from './classes.reducer';
import { studentsEditReducer } from './student-edit.reducer';

export const studentsReducer = combineReducers({
  studentsModal: studentsModalReducer,
  sorting: sortingReducer,
  studentsAndClasses: studentsAndClassesReducer,
  students: _studentsReducer,
  classes: classesReducer,
  studentsEdit: studentsEditReducer
})
