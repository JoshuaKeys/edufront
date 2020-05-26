import { createReducer, on } from "@ngrx/store";
import { StaffsModalsModel } from '../../models/staffs-modal.model';
import { toggleAddEditModal } from '../actions';

const initialState: StaffsModalsModel = {
  editModal: false
};
const staffsModalReducer = createReducer(initialState,
  on(toggleAddEditModal, (state, action) => ({
    editModal: !state.editModal
  }))
);

export default staffsModalReducer;
