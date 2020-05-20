import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SubjectsStateModel } from '../models/subjects-state.model';
import { selectAll } from './reducers/subjects.reducer';
import * as fromClassesReducer from '../ngrx/reducers/classes.reducer';

const subjectsFeature = createFeatureSelector<SubjectsStateModel>('subjects');
const selectClassesState = createSelector(
  subjectsFeature, subFeat => subFeat.classes
)

export const selectSubjectModalState = createSelector(
  subjectsFeature, subFeat => subFeat.modal
);

export const selectSubjectsState = createSelector(
  subjectsFeature, subFeat => subFeat.subjects
)

export const selectAllSubjects = createSelector(
  selectSubjectsState, selectAll
)
export const selectAllClasses = createSelector(
  selectClassesState, fromClassesReducer.selectAll
)
export const selectSortedClasses = createSelector(selectAllClasses, classes => {
  return classes && classes.length > 0 ? classes.slice().sort((a, b) => {
    if (a.grade < b.grade) {
      return -1;
    }
    if (a.grade > b.grade) {
      return 1;
    }
    return 0;

  }) : []
})
