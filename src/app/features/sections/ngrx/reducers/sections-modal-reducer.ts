import { createReducer, on } from '@ngrx/store';
import { SectionsModalState } from '../../models/sections-modal-state.model';
import { toggleModal } from '../actions/sections-modal.actions';
import { state } from '@angular/animations';

const initialState: SectionsModalState = {
  endModal: false,
  startModal: true
}
export const sectionsModalReducer = createReducer(initialState,
  on(toggleModal, (state, action) => {
    return {
      ...state,
      [action.modal]: !state[action.modal]
    }
  })
)
