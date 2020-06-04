import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SchoolProfileModel } from '../../models/school-profile.model';

export const schoolProfileFeature = createFeatureSelector<SchoolProfileModel>('schoolProfile');

export const selectPreviewState = createSelector(
  schoolProfileFeature,
  schProfFeat => schProfFeat.preview
);

export const selectLogoPreview = createSelector(
  selectPreviewState,
  previewState => {
    const index = previewState.findIndex(previewItem => previewItem.label === 'School Logo')
    if (index > -1) {
      return previewState[index].values[0].value;
    }
    return null
  }
)
