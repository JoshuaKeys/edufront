import { createSelector } from "@ngrx/store";
import { schoolProfileFeature } from './preview-selectors';

export const selectSchoolProfile = createSelector(
  schoolProfileFeature, schoolProfFeat => schoolProfFeat.profile
)
export const selectSchoolName = createSelector(
  schoolProfileFeature,
  schoolProfFeat => schoolProfFeat.profile.schoolName
)
export const selectSchoolAddress = createSelector(
  selectSchoolProfile, schoolProfile => schoolProfile.address
)
export const selectSchoolContact = createSelector(
  selectSchoolProfile, schoolProfile => schoolProfile.contact
)
export const selectSchoolLogo = createSelector(
  selectSchoolProfile, schoolProfile => schoolProfile.schoolLogo
)
