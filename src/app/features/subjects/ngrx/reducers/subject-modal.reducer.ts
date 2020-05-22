import { SubjectModalStateModel } from "../../models/subject-modal-state.model";
import { createReducer, on } from '@ngrx/store';
import { closeSubjectsStartModal, toggleFormModal, toggleEndModal } from '../actions';

const initialState: SubjectModalStateModel = {
  startModal: true,
  formModal: false,
  endModal: false
};

const _modalReducer = createReducer(initialState, on(
  closeSubjectsStartModal, (state, action) => ({
    ...state,
    startModal: false
  })
), on(toggleFormModal, (state, action) => {
  return {
    ...state,
    formModal: !state.formModal
  }
}),
  on(toggleEndModal, (state, action) => {
    return {
      ...state,
      endModal: !state.endModal
    }
  }))

export function modalReducer(state, action) {
  return _modalReducer(state, action);
}
