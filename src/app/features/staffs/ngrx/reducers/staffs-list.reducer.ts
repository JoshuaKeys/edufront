import { createReducer, on } from "@ngrx/store";
import { fetchStaffsSuccess } from '../actions';
import { createEntityAdapter } from '@ngrx/entity';
import { StaffModel } from '../../models/staff.model';

const staffsAdapter = createEntityAdapter<StaffModel>();

const initialState = staffsAdapter.getInitialState();
const _staffsListReducer = createReducer(initialState,
  on(fetchStaffsSuccess, (state, action) => {
    return staffsAdapter.addAll(action.staffs, state);
  })
);

export function staffsListReducer(state, action) {
  return _staffsListReducer(state, action);
}

export const { selectAll } = staffsAdapter.getSelectors();

