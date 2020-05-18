import { createAction, props } from '@ngrx/store';
import { SchoolProfile } from '../../../core/models/school-profile.interface';

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
  props<{value: any}>()
);

export const setContacts = createAction(
  '[School-Profile Page] set Address',
  props<{value: any}>()
);

export const setSchoolLogo = createAction(
  '[School-Profile Page] set school Logo',
  props<{value: any, error: string}>()
);

export const saveSchoolProfile = createAction(
  '[School-Profile Page] save school profile',
  props<{value: SchoolProfile, error: string}>()
);
