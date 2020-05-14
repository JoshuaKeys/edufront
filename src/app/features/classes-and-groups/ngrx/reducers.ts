import { createReducer, createFeatureSelector, on } from "@ngrx/store";
import { ClassesAndGroupsModel } from '../models/classes-and-group.model';
import * as fromActions from './actions';

const initialState: ClassesAndGroupsModel = {
  groupsOfClassesNum: 0
};

const _classesAndGroupsReducer = createReducer(initialState,
  on(fromActions.SetGroupOfClassesQty, (state, action) => ({
    ...state,
    groupsOfClassesNum: action.qty

  })),
  on(fromActions.SetInputError, (state, action) => ({
    ...state,
    inputError: {
      msg: action.error,
      value: action.value
    }
  }))
);

export function classesAndGroupsReducer(state, action) {
  return _classesAndGroupsReducer(state, action);
}

