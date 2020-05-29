import { createReducer, on } from "@ngrx/store";
import { fetchStaffsSuccess, deleteStaffSuccess } from '../actions';
import { createEntityAdapter } from '@ngrx/entity';
import { StaffModel } from '../../models/staff.model';

const staffsAdapter = createEntityAdapter<StaffModel>();

const initialState = staffsAdapter.getInitialState();
export const staffsListReducer = createReducer(initialState,
  on(fetchStaffsSuccess, (state, action) => {
    return staffsAdapter.addAll(action.staffs, state);
  }),
  on(deleteStaffSuccess, (state, action) => staffsAdapter.removeOne(action.staff.id, state))
);


export const { selectAll } = staffsAdapter.getSelectors();

