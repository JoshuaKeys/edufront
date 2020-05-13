import {Action, createReducer} from '@ngrx/store';
import { initialSchoolProfileState, SchoolProfileState } from '../state/school-profile.state';

const reducer = createReducer(
  initialSchoolProfileState
);

export function schoolProfileReducer(state: SchoolProfileState | undefined, action: Action) {
  return reducer(state, action );
}
