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
export const setCountryIdData = createAction(
  '[SchoolAddressQuestion] setCountryIdData',
  props<{ countryId: string }>()
)
export const setPhoneData = createAction(
  '[ContactDetailsQuestion] setPhoneData',
  props<{ field: string, prefix: string, phoneNum: string, icon?: string }>()
)
export const setContactsData = createAction(
  '[ContactDetailsQuestion] setContactData',
  props<{ field: string, value: string }>()
)
export const uploadSchoolLogoRequest = createAction(
  '[SchoolLogoUploadComponent] uploadSchoolLogRequest',
  props<{ logo: File, preview: string }>()
)
export const setSchoolLogo = createAction(
  '[SchoolLogoUploadComponent] setSchoolLogo',
  props<{ logo: string, preview: string }>()
)
export const toggleProfileStartModal = createAction(
  '[SchoolProfileConfirmationComponent] toggleProfileStartModal'
)
export const toggleProfileEndModal = createAction(
  '[SchoolProfileEffects] toggleProfileEndModal'
)
export const createSchoolRequest = createAction(
  '[SchoolProfileConfirmationComponent] createSchoolRequest'
)
