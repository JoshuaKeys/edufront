import { schoolProfileFeature } from './preview-selectors';
import { createSelector } from '@ngrx/store';

export const selectProfileModal = createSelector(
  schoolProfileFeature,
  profileFeat => profileFeat.modal
);
