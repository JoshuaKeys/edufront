import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { SubjectModel } from '../../models/subject.model';
import { createReducer, on } from '@ngrx/store';
import { fetchAllSubjectsSuccess, createSubjectSuccess } from '../actions';
export interface SubjectsSubState extends EntityState<SubjectModel> { }

interface SelectedState {
  selected: string[]
};
const initialSelectedState: SelectedState = { selected: [] };
export const subjectsSubReducer = createReducer(
  initialSelectedState,
);
