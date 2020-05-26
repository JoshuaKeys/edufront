import { createAction, props } from '@ngrx/store';
import { GetStaffResponseModel } from '../../models/get-staff-response.model';

export const fetchStaffsRequest = createAction(
  '[StaffShellComponent] fetchStaffsRequest'
)
export const fetchStaffsSuccess = createAction(
  '[StaffEffects] fetchStaffsSuccess',
  props<{ staffs: GetStaffResponseModel[] }>()
)
