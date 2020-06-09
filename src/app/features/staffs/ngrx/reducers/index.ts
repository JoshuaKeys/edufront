import { combineReducers } from "@ngrx/store";
import { staffsListReducer } from './staffs-list.reducer';
import staffsModalReducer from './staffs-modals.reducer';
import { subjectsReducer } from './subjects.reducer';
import { classesReducer } from './classes.reducer'
import { subjectClassesAssociationReducer } from './subject-classes-assoc.reducer';
import { sortingReducer } from './sorting.reducer';
import { staffEditReducer } from './staffs-edit.reducer';
export const staffsReducer = combineReducers({
  staffsList: staffsListReducer,
  classes: classesReducer,
  subjects: subjectsReducer,
  staffsModal: staffsModalReducer,
  subjectClassesAssociation: subjectClassesAssociationReducer,
  sorting: sortingReducer,
  edit: staffEditReducer
})
