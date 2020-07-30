import { createReducer, on } from '@ngrx/store';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { fetchAllClassesSuccess } from '../actions/console-classes/console-classes-groups.actions';
const initialState: ExtendedClassModel[] = []
export const classesReducer = createReducer(
  initialState,
  on(fetchAllClassesSuccess, (state, action) => {
    return action.classes;
  })
)
