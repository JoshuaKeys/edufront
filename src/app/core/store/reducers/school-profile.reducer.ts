import { Action, createReducer, on } from '@ngrx/store';
import { initialSchoolProfileState, SchoolProfileState } from '../state/school-profile.state';
import * as formActions from './../actions/school-profile.actions';

const reducer = createReducer(
  initialSchoolProfileState,
  on(formActions.setName, (state, action) =>({
    ...state,
    schoolProfile: {
      name: action.value
    }
  }))
);

export function schoolProfileReducer(state: SchoolProfileState | undefined, action: Action) {
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
