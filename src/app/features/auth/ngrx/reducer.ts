import { AuthStateModel } from '../models/auth-state.model'
import { createReducer, on } from '@ngrx/store';
import { retrieveTokenSuccess } from './actions';

const initialState: AuthStateModel = {
  token: undefined
};
export const _authReducer = createReducer(initialState,
  on(retrieveTokenSuccess, (state, action) => ({
    ...state,
    token: action.token
  }))
);

export function authReducer(state, action) {
  return _authReducer(state, action);
}
