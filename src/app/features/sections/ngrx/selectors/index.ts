import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SectionsStateModel } from '../../models/sections-state.model';

const sectionsFeature = createFeatureSelector<SectionsStateModel>('sections');

export const selectModalState = createSelector(sectionsFeature, feat => feat.sectionsModal);

