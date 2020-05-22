import { createAction, props } from '@ngrx/store';

export type AddressFieldTypes = 'country' | 'zipCode' | 'address' | 'state' | 'city';

export const setSchoolName = createAction(
  '[SchoolNameQuestionComponent] setSchoolName',
  props<{ schoolName: string }>()
)

export const setAddressData = createAction(
  '[SchoolAddressQuestion] setAddressData',
  props<{ field: string, value: string }>()
)

export const setContactsData = createAction(
  '[ContactDetailsQuestion] setContactData',
  props<{ field: string, value: string }>()
)
