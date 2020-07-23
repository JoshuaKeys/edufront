import { createReducer, on } from "@ngrx/store";
import { createEntityAdapter } from '@ngrx/entity';
import { GeneratedGroupsModel } from '../../../models/generated-groups.model';
import { fetchGeneratedGroupsSuccess, fetchAllClassesSuccess } from '../../actions/console-classes';
import { ConsoleClassesStateModel } from '../../../models/console-classes-state.model';


const initialState: ConsoleClassesStateModel = {}

export const consoleClassesReducer = createReducer(initialState,
  on(fetchAllClassesSuccess, (state, action) => {
    return {
      ...state,
      classes: action.classes
    }
  }),
  on(fetchGeneratedGroupsSuccess, (state, action) => {
    return {
      ...state,
      classesAndGroups: {
        groups: action.generatedGroups
      }
    }
  })
);
