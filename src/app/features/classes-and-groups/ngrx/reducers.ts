import { createReducer, createFeatureSelector, on } from "@ngrx/store";
import { ClassesAndGroupsModel } from '../models/classes-and-group.model';
import * as fromActions from './actions';

const initialState: ClassesAndGroupsModel = {
  groupsOfClassesNum: 0,
  modals: {
    startModal: true,
    endModal: false
  }
};


const _classesAndGroupsReducer = createReducer(initialState,
  on(fromActions.setGroupOfClassesQty, (state, action) => ({
    ...state,
    groupsOfClassesNum: action.qty

  })),
  on(fromActions.setInputError, (state, action) => ({
    ...state,
    inputError: {
      msg: action.error,
      value: action.value
    }
  })),
  on(fromActions.getClassesSuccess, (state, action) => ({
    ...state,
    classes: action.classes
  })),
  on(fromActions.toggleClass, (state, action) => {
    let classes = state.classes.map(_class => ({ ..._class }));
    classes = classes.map(item => {
      if (item.name === action.name) {
        item.selected = !item.selected;
        return item;
      }
      return item;
    });

    return {
      ...state,
      classes
    }
  }),
  on(fromActions.closeClassesAndGroupsModal, (state, action) => ({
    ...state,
    modals: {
      ...state.modals,
      startModal: false
    }
  })),
  on(fromActions.openClassesAndGroupsEndModal, (state, action) => ({
    ...state,
    modals: {
      ...state.modals,
      endModal: true
    }
  }))
);

export function classesAndGroupsReducer(state, action) {
  return _classesAndGroupsReducer(state, action);
}

