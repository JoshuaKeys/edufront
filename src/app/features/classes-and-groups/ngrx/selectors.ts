import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClassesAndGroupsModel } from '../models/classes-and-group.model';

export const CLASSES_AND_GROUPS = 'classesAndGroups';
const featureSelector = createFeatureSelector<ClassesAndGroupsModel>(CLASSES_AND_GROUPS);

export const selectNumOfGroups = createSelector(featureSelector, featSel => featSel.groupsOfClassesNum)
