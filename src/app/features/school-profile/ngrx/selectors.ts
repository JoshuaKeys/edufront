import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SchoolProfile } from '../models/school-profile.interface';
import { State } from './state';


const featureSelector = createFeatureSelector<SchoolProfile>('schoolProfile');
export const selectorSchoolName = createSelector(featureSelector,
    state => state['schoolProfile']);

export const selectorSchoolAddress = createSelector(featureSelector, state => state['schoolProfile'].addressDto);

export const selectorSchoolContacts = createSelector(featureSelector, state => {
  return (state['schoolProfile'].email || state['schoolProfile'].phoneNo || state['schoolProfile'].website)
    ? {
      email: state['schoolProfile'].email,
      phoneNo: state['schoolProfile'].phoneNo,
      website: state['schoolProfile'].website
    }
    :
    null;
});

export const selectorSchoolLogo = createSelector(featureSelector, state => state['schoolProfile'].image64);
