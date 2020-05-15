import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ClassesAndGroupsModel } from '../models/classes-and-group.model';

export const CLASSES_AND_GROUPS = 'classesAndGroups';
const featureSelector = createFeatureSelector<ClassesAndGroupsModel>(CLASSES_AND_GROUPS);

export const selectNumOfGroups = createSelector(featureSelector, featSel => featSel.groupsOfClassesNum)
export const selectSortedClasses = createSelector(featureSelector, featSel => {
  return featSel.classes && featSel.classes.length > 0 ? featSel.classes.slice().sort((a, b) => {
    if (+a.name < +b.name) {
      return -1;
    }
    if (+a.name > +b.name) {
      return 1;
    }
    return 0;

  }) : []
})
export const selectSelectedClasses = createSelector(selectSortedClasses, featSel => featSel.filter((_class) => _class.selected))
export const selectModalState = createSelector(featureSelector, featSel => featSel.modals)
export const selectGroupsClassMap = createSelector(featureSelector, featSel => featSel.groupsClassesMap);

export const selectAnUngroupedClass = createSelector(featureSelector, featSel => featSel.classes.find(_class => _class.selected && !_class.dragged))
