import { createAction, props } from '@ngrx/store';
import { GetStaffResponseModel } from '../../models/get-staff-response.model';
import { SubjectModel } from 'src/app/shared/models/_subject.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { EntityState } from '@ngrx/entity';

export const fetchStaffsRequest = createAction(
  '[StaffShellComponent] fetchStaffsRequest'
)
export const fetchStaffsSuccess = createAction(
  '[StaffEffects] fetchStaffsSuccess',
  props<{ staffs: GetStaffResponseModel[] }>()
)
export const toggleAddEditModal = createAction(
  '[StaffsCreationComponent] toggleAddEditModal'
)
export const fetchSubjectsRequest = createAction(
  '[StaffFormComponent] fetchSubjectsRequest'
)
export const fetchSubjectSuccess = createAction(
  '[StaffsEffects] fetchSubjectSuccess',
  props<{ subjects: SubjectModel[] }>()
)
export const fetchClassesRequest = createAction(
  '[StaffsFormComponent] fetchClassesRequest'
)
export const fetchClassesSuccess = createAction(
  '[StaffsEffects] fetchClassesSuccess',
  props<{ classes: ClassModel[] }>()
)
