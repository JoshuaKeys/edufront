import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SchoolProfile } from '../../../core/models/school-profile.interface';


const featureSelector = createFeatureSelector<SchoolProfile>('schoolProfile');
export const selectorSchoolName = createSelector(featureSelector,
    state => state['schoolProfile']);

