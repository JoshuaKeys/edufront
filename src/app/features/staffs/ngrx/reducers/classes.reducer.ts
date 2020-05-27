import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { ClassModel } from 'src/app/shared/models/class.model';
import { fetchClassesSuccess } from '../actions';

const classesAdapter = createEntityAdapter<ClassModel>();
const initialState = classesAdapter.getInitialState();
export const classesReducer = createReducer(initialState,
  on(fetchClassesSuccess, (state, action) => {
    console.log(action.classes)
    return classesAdapter.addAll(action.classes, state)
  })
)

export const { selectAll } = classesAdapter.getSelectors();
