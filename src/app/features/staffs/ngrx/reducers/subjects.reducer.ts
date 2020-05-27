import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { SubjectModel } from 'src/app/shared/models/_subject.model';
import { fetchSubjectSuccess } from '../actions';

const subjectsAdapter = createEntityAdapter<SubjectModel>();
const initialState = subjectsAdapter.getInitialState();

export const subjectsReducer = createReducer(initialState,
  on(fetchSubjectSuccess, (state, action) => subjectsAdapter.addAll(action.subjects, state))
);
export const { selectAll } = subjectsAdapter.getSelectors()
