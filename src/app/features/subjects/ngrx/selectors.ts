import { createFeatureSelector, createSelector } from "@ngrx/store";
import { SubjectsStateModel } from '../models/subjects-state.model';
import { selectAll } from './reducers/subjects.reducer';
import * as fromClassesReducer from '../ngrx/reducers/classes.reducer';
import { SubjectModel } from 'src/app/shared/models/subject.model';

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
export const getAllSelectedClasses = createSelector(selectAllClasses, classes => {
  return classes.filter(val => val.selected === true)
})
export const getCommonClasses = createSelector(getAllSelectedClasses, classes => {
  const subjects = classes.map(classItem => classItem.subjects ? classItem.subjects : [])
  console.log(getIntersection(subjects));
  return getIntersection(subjects)
})

function getIntersection(arrayGroup: SubjectModel[][]) {
  return arrayGroup.reduce((accumulator, currentVal, currIndex) => {
    if (currIndex === 0) {
      return currentVal;
    }

    let newArray = [];
    for (let i = 0; i < currentVal.length; i++) {
      if (accumulator.find(item => currentVal[i].id === item.id)) {
        newArray.push(currentVal[i]);
      }
    }
    return newArray;
  }, []);
}
