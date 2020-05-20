import { SubjectModalStateModel } from "../../models/subject-modal-state.model";
import { createReducer, on } from '@ngrx/store';
import { closeSubjectsStartModal } from '../actions';

const initialState: SubjectModalStateModel = {
  startModal: true,
  endModal: false
};

const _modalReducer = createReducer(initialState, on(
  closeSubjectsStartModal, ((state, action) => ({
    ...state,
    startModal: false
  }))
))

export function modalReducer(state, action) {
  return _modalReducer(state, action);
}
