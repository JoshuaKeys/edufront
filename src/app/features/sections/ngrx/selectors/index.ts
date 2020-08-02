import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SectionsStateModel } from '../../models/sections-state.model';
import {
  selectUnassignedStudents,
  selectNotDraggedStudents,
  selectSections
} from './classes.selectors';
const sectionsFeature = createFeatureSelector<SectionsStateModel>('sections');

export const selectModalState = createSelector(
  sectionsFeature,
  feat => feat.sectionsModal
);

export { selectUnassignedStudents, selectNotDraggedStudents, selectSections };
