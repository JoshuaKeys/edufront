import { createReducer, on } from "@ngrx/store";
import { fetchStaffsSuccess, deleteStaffSuccess, createStaffResponse, editStaffResponse } from '../actions';
import { createEntityAdapter, Update } from '@ngrx/entity';
import { StaffModel } from '../../../../shared/models/staff.model';

const staffsAdapter = createEntityAdapter<StaffModel>();

const initialState = staffsAdapter.getInitialState();
export const staffsListReducer = createReducer(initialState,
  on(fetchStaffsSuccess, (state, action) => {
    return staffsAdapter.addAll(action.staffs, state);
  }),
  on(createStaffResponse, (state, action) => {
    return staffsAdapter.addOne(action.staff.profileDto, state);
  }),
  on(editStaffResponse, (state, action) => {
    const update: Update<StaffModel> = {
      id: action.staff.profileDto.id,
      changes: {
        ...action.staff.profileDto
      }
    }
    return staffsAdapter.updateOne(update, state);
  }),
  on(deleteStaffSuccess, (state, action) => staffsAdapter.removeOne(action.staff.id, state))
);


export const { selectAll } = staffsAdapter.getSelectors();

