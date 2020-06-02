import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { ClassModel } from 'src/app/shared/models/class.model';
import { fetchedClassesSuccess } from '../actions/class-students.actions';

const classesAdapter = createEntityAdapter<ClassModel>();
const initialState = classesAdapter.getInitialState();
export const classesReducer = createReducer(initialState,
  on(fetchedClassesSuccess, (state, action) => classesAdapter.addAll(action.classes, state))
);

export const { selectAll } = classesAdapter.getSelectors()
