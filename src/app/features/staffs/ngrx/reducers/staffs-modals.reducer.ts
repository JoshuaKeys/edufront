import { createReducer, on } from "@ngrx/store";
import { StaffsModalsModel } from '../../models/staffs-modal.model';
import { toggleAddEditModal, toggleEndModal, toggleStartModal } from '../actions';

const initialState: StaffsModalsModel = {
  editModal: false,
  endModal: false,
  startModal: true
};
const staffsModalReducer = createReducer(initialState,
  on(toggleAddEditModal, (state, action) => ({
    ...state,
    editModal: !state.editModal
  })),
  on(toggleEndModal, (state, action) => ({
    ...state,
    endModal: !state.endModal
  })),
  on(toggleStartModal, (state, action) => ({
    ...state,
    startModal: !state.startModal
  }))
);

export default staffsModalReducer;
