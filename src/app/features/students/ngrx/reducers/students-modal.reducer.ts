import { createReducer, on } from '@ngrx/store';
import { StudentsModalModel } from '../../models/students-modal.model';
import { toggleStartModal, toggleAddModal, toggleEndModal } from '../actions/students-modal.actions';

const initialState: StudentsModalModel = {
  startModal: true,
  endModal: false,
  editModal: false,
  addModal: false
};
export const studentsModalReducer = createReducer(initialState,
  on(toggleStartModal, (state, action) => {
    return {
      ...state,
      startModal: !state.startModal
    }
  }),
  on(toggleAddModal, (state, action) => {
    return {
      ...state,
      editModal: !state.editModal
    }
  }),
  on(toggleEndModal, (state, action) => {
    alert('hello')
    return {
      ...state,
      endModal: !state.endModal
    }
  })
);
