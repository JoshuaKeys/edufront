import { createSelector } from "@ngrx/store";
import { schoolProfileFeature } from './preview-selectors';

export const selectSchoolName = createSelector(
  schoolProfileFeature,
  schoolProfFeat => schoolProfFeat.profile.schoolName
)
