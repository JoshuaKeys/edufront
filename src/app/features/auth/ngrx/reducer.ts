import { createReducer } from "@ngrx/store";
import { AuthModel } from '../models/auth.model';

const initialState: AuthModel = {
  token: 'undefined'
};
const _authReducer = createReducer(initialState);

export function authReducer(state, action) {
  return _authReducer(state, action);
}
