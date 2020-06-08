import { createAction, props } from '@ngrx/store';
import { GetStaffResponseModel } from '../../models/get-staff-response.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { SelectableSubjectModel } from 'src/app/shared/models/selectable-subject.model';
import { CreateStaffRequestModel } from '../../models/create-staff-request.model';
import { CreateStaffResponseModel } from '../../models/create-staff-response.model';
import { StaffFormModel } from '../../models/staff-form.model';
import { StaffModel } from '../../../../shared/models/staff.model';

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
  props<{ subjects: SelectableSubjectModel[] }>()
)
export const fetchClassesRequest = createAction(
  '[StaffsCreationComponent] fetchClassesRequest'
)
export const fetchClassesSuccess = createAction(
  '[StaffsEffects] fetchClassesSuccess',
  props<{ classes: ClassModel[] }>()
)
export const setSelectedState = createAction(
  '[StaffsCreationComponent] setSelectedState',
  props<{ subjectId: string }>()
)
export const unSetSelectedState = createAction(
  '[StaffsCreationComponent] unSetSelectedState',
  props<{ subjectId: string }>()
)

export const addClassToSubjectRequest = createAction(
  '[StaffsCreationComponent] addClassToSubjectRequest',
  props<{ class: ClassModel }>()
)
export const toggleClassInSubject = createAction(
  '[StaffEffects] toggleClassInSubject',
  props<{ subjectId: string, class: ClassModel }>()
)
export const doNothing = createAction(
  '[StaffEffects] doNothing'
)
export const createStaffRequest = createAction(
  '[StaffsCreationComponent] createStaffRequest',
  props<{ staff: StaffFormModel }>()
)
export const createStaffResponse = createAction(
  '[StaffsEffect] createStaffResponse',
  props<{ staff: CreateStaffResponseModel }>()
)
export const toggleSortByGender = createAction(
  '[StaffsCreationComponent] toggleSortByGender'
)
export const toggleSortByAlphabet = createAction(
  '[StaffsCreationComponent] toggleSortByAlphabet'
)
export const deleteStaffRequest = createAction(
  '[StaffCreationComponent] deleteStaffRequest',
  props<{ staff: StaffModel }>()
)
export const deleteStaffSuccess = createAction(
  '[StaffEffects] delteStaffSuccess',
  props<{ staff: StaffModel }>()
)
export const toggleEndModal = createAction(
  '[StaffsCreationComponent] toggleEndModal'
)
export const toggleStartModal = createAction(
  '[StaffsCreationComponent] toggleStartModal'
)
