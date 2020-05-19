import { Action, createReducer, on } from '@ngrx/store';
import { initialSchoolProfileState, State } from './state';
import * as formActions from './actions';
import { setContacts } from './actions';

const reducer = createReducer(
  initialSchoolProfileState,
  on(formActions.setName, (state, action) =>({
    ...state,
    schoolProfile: {
      ...state.schoolProfile,
      name: action.value
    }
  })),
  on(formActions.setAddress, (state, action) =>({
    ...state,
    schoolProfile: {
      ...state.schoolProfile,
      addressDto: action.value
    }
  })),
  on(formActions.setContacts, (state, action) =>({
    ...state,
    schoolProfile: {
      ...state.schoolProfile,
      email: action.value.email,
      phoneNo: action.value.phoneNo,
      website: action.value.website
    }
  }))
);

export function reducers(state: State | undefined, action: Action) {
  return reducer(state, action );
}

/**
 *
 * email?: string;
 phoneNo?: string;
 website?: string;
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
