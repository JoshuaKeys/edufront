import { Action, createReducer, on } from '@ngrx/store';
import { initialSchoolProfileState, State } from './state';
import * as formActions from './actions';

const reducer = createReducer(
  initialSchoolProfileState,
  on(formActions.setName, (state, action) =>({
    ...state,
    schoolProfile: {
      ...state.schoolProfile,
      name: action.value
    }
  }))
);

export function reducers(state: State | undefined, action: Action) {
  return reducer(state, action );
}

/**
{
 schoolProfile: null,
 wellcomePopup: {
    toched: false
  },
 endPopup: {
    toched: false,
  },
 error: null
 };
 */
