import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SchoolProfileModel } from '../../models/school-profile.model';

export const schoolProfileFeature = createFeatureSelector<SchoolProfileModel>('schoolProfile');

export const selectPreviewState = createSelector(
  schoolProfileFeature,
  schProfFeat => schProfFeat.preview
);
