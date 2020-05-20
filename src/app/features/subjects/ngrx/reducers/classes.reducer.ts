import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { ClassModel } from 'src/app/shared/models/class.model';
import { createReducer, on } from '@ngrx/store';
import * as fromSubjectActions from '../actions/index'
import { ExtendedClassModel } from '../../models/extend-class.model';

export interface ClassesState extends EntityState<ExtendedClassModel> { }

const classAdapter = createEntityAdapter<ExtendedClassModel>();

const initialState = classAdapter.getInitialState();

export const classesReducer = createReducer(initialState,
  on(fromSubjectActions.getClassesSuccess, (state, action) => classAdapter.addAll(action.classes, state)),

);

export const { selectAll } = classAdapter.getSelectors()
