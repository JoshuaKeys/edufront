import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StudentsStateModel } from '../../models/students-state.model';
import { selectAll } from '../reducers/students-and-Classes.reducer';
import * as fromStudents from '../reducers/students.reducer';
import * as fromClasses from '../reducers/classes.reducer';
const featureState = createFeatureSelector<StudentsStateModel>('students');
export const selectModalState = createSelector(featureState, feat => feat.studentsModal);
export const selectSortingState = createSelector(featureState, feat => feat.sorting)
export const selectStudentsAndClassesFeature = createSelector(featureState, feat => feat.studentsAndClasses)
export const selectStudentsAndClasses = createSelector(selectStudentsAndClassesFeature, selectAll);

export const selectAllStudents = createSelector(featureState, feat => fromStudents.selectAll(feat.students))
export const selectAllClasses = createSelector(featureState, feat => fromClasses.selectAll(feat.classes))

export const selectEditData = createSelector(featureState, feat => feat.edit)
