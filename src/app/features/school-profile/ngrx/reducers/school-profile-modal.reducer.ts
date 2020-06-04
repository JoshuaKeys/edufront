import { createReducer, on } from "@ngrx/store";
import { ProfileModel } from '../../models/profile.model';
import { setSchoolName, setAddressData, setContactsData, setSchoolLogo, toggleProfileEndModal, toggleProfileStartModal } from '../actions';
import { ProfileModalModel } from '../../models/profile-modal.model';
const initialState: ProfileModalModel = {
  startModal: true,
  endModal: false
};
export const profileModalReducer = createReducer(initialState,
  on(toggleProfileStartModal, (state, action) => ({ ...state, startModal: !state.startModal })),
  on(toggleProfileEndModal, (state, action) => ({ ...state, endModal: !state.endModal }))
);
