import { createReducer, on } from '@ngrx/store';
import { StaffModel } from 'src/app/shared/models/staff.model';
import { fetchStaffByIdSuccess } from '../actions';

const initialState: StaffModel = null;
export const staffEditReducer = createReducer(initialState, on(
  fetchStaffByIdSuccess, (state, action) => {
    return action.staff;
  }
))
