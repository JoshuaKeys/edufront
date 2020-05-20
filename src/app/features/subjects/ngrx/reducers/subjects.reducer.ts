import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { SubjectModel } from '../../models/subject.model';
import { createReducer, on } from '@ngrx/store';
import { fetchAllSubjectsSuccess, createSubjectSuccess } from '../actions';
export interface SubjectsSubState extends EntityState<SubjectModel> { }

const adapter = createEntityAdapter<SubjectModel>();

export const initialSubjectsSubState = adapter.getInitialState();

export const subjectsSubReducer = createReducer(
  initialSubjectsSubState,
  on(fetchAllSubjectsSuccess, (state, action) => {
    return adapter.addAll(action.subjects, state);
  }),
  on(createSubjectSuccess, (state, action) => adapter.addOne(action.subject, state))
);

export const { selectAll } = adapter.getSelectors();
