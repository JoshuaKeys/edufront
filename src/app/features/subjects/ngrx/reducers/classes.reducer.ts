import { EntityState, createEntityAdapter, Update } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as fromSubjectActions from '../actions/index'

import { ExtendedClassModel } from '../../models/extend-class.model';
import { selectAllClasses } from '../selectors';

export interface ClassesState extends EntityState<ExtendedClassModel> { }

const classAdapter = createEntityAdapter<ExtendedClassModel>();

const initialState = classAdapter.getInitialState();

// function notDuplicated(previousSubjects, newSubjects) {

// }

export const classesReducer = createReducer(initialState,
  on(fromSubjectActions.getClassesSuccess, (state, action) => classAdapter.addAll(action.classes, state)),
  on(fromSubjectActions.toggleClass, (state, action) => {
    const classItem = selectAll(state).find(item => item.id === action.classId)
    let update = {
      id: action.classId,
      changes: {
        selected: !classItem.selected
      }
    }
    return classAdapter.updateOne(update, state);
  }),
  on(fromSubjectActions.assignToSelectedClasses, (state, action) => {
    const updates = action.selectedSubClasses.map(subClass => {
      let previousClassState = selectAll(state).find(classItem => classItem.id === subClass.id)
      let previousSubjects = previousClassState.subjects ? previousClassState.subjects : [];
      let subjectsUpdate;
      if (!previousSubjects.find(subject => subject.id === action.subject.id)) {
        subjectsUpdate = [
          ...previousSubjects,
          action.subject
        ]
      } else {
        subjectsUpdate = [
          ...previousSubjects
        ]
      }
      return {
        id: subClass.id,
        changes: {
          subjects: subjectsUpdate
        }
      }
    });
    return classAdapter.updateMany(updates, state);
  })
);

export const { selectAll } = classAdapter.getSelectors()
