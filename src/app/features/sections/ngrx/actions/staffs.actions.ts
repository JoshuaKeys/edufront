import { createAction, props } from '@ngrx/store';
import { StaffModel } from 'src/app/shared/models/staff.model';

export const setStaffData = createAction(
  '[StaffsEffects] setStaffData',
  props<{ staffs: StaffModel[] }>()
)
export const clearStaffData = createAction(
  '[StaffsEffects] clearStaffData'
);
