import { createReducer, on } from '@ngrx/store';
import { toggleClassInSubject, setEditClassesSubjectsAssociation } from '../actions';
import { SubjectClassesAssociation } from '../../models/subject-classes-association.model';



const initialState: SubjectClassesAssociation[] = [];
export const subjectClassesAssociationReducer = createReducer(initialState,
  on(toggleClassInSubject, (state, action) => {
    const stateCopy: SubjectClassesAssociation[] = JSON.parse(JSON.stringify(state));
    const itemIdx = stateCopy.findIndex(item => item.subjectId === action.subjectId);

    if (itemIdx === -1) {
      stateCopy.push({ subjectId: action.subjectId, classes: [action.class] })
      return stateCopy;
    }

    const isClassPresentAlready = stateCopy[itemIdx] ? stateCopy[itemIdx].classes.findIndex(item => item.id === action.class.id) : -1;

    if (isClassPresentAlready > -1) {
      stateCopy[itemIdx].classes.splice(isClassPresentAlready, 1)
    } else {
      stateCopy[itemIdx].classes.push(action.class)
    }
    return stateCopy;
  }),
  on(setEditClassesSubjectsAssociation, (state, action) => {
    return action.associations;
  })
);
