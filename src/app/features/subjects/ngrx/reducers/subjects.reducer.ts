import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { SubjectModel } from '../../models/subject.model';
import { createReducer, on } from '@ngrx/store';
import { fetchAllSubjectsSuccess, createSubjectSuccess } from '../actions';
import { ISubjectWithTeachers } from 'src/app/shared/models/subject.model';
export interface SubjectsSubState extends EntityState<ISubjectWithTeachers> { }

const adapter = createEntityAdapter<ISubjectWithTeachers>();

export const initialSubjectsSubState = adapter.getInitialState();

export const subjectsSubReducer = createReducer(
  initialSubjectsSubState,
  on(fetchAllSubjectsSuccess, (state, action) => {
    return adapter.addAll(action.subjects ? action.subjects : [], state);
  }),
  on(createSubjectSuccess, (state, action) => adapter.addOne(action.subject, state))
);

export const { selectAll } = adapter.getSelectors();
