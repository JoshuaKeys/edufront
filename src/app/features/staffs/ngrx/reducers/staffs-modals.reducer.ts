import { createReducer, on } from "@ngrx/store";
import { StaffsModalsModel } from '../../models/staffs-modal.model';
import { toggleAddModal, toggleEndModal, toggleStartModal, toggleEditModal } from '../actions';

const initialState: StaffsModalsModel = {
  editModal: false,
  addModal: false,
  endModal: false,
  startModal: true
};
const staffsModalReducer = createReducer(initialState,
  on(toggleAddModal, (state, action) => ({
    ...state,
    addModal: !state.addModal
  })),
  on(toggleEditModal, (state, action) => ({
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
