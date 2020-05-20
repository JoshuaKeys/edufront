import { createAction, props } from '@ngrx/store';
import { addressModel } from '../models/adress.model';
import { error } from './state';

export const showWellcomePopup = createAction(
  '[School-Profile Page] show popup',
  props<{ value: boolean }>()
);

export const setName = createAction(
  '[School-Profile Page] set name',
  props<{ value: string }>()
);

export const setAddress = createAction(
  '[School-Profile Page] set Address',
  props<{value: addressModel}>()
);

export const setContacts = createAction(
  '[School-Profile Page] set Contacts',
  props<{value: any}>()
);

export const setSchoolLogo = createAction(
  '[School-Profile Page] set school Logo',
  props<{value: any}>()
);

export const getCountries = createAction('[School-Profile Page] load countries');
export const loadCountries = createAction('[School-Profile Page] load countries to store',
  props<{value: any}>()
);
export const getCountriesError = createAction('[School-Profile Page] load countries Error',
  props<{value: error}>()
);

export const uploadSchoolLogo = createAction('[School-Profile Page] upload school Logo');

export const uploadSuccess = createAction('[School-Profile Page] upload school Logo succsess',
  props<{value: string}>()
);

export const uploadFail = createAction('[School-Profile Page] upload school Logo fail',
  props<{value: error}>()
);

export const saveSchoolProfile = createAction('[School-Profile Page] save school profile');
