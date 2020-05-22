import { createReducer, on } from "@ngrx/store";
import { ProfileModel } from '../../models/profile.model';
import { setSchoolName, setAddressData, setContactsData } from '../actions';
const initialState: ProfileModel = {
  schoolName: null,
};
export const profileReducer = createReducer(initialState,
  on(setSchoolName, (state, { schoolName }) => ({ ...state, schoolName })),
  on(setAddressData, (state, action) => {
    let stateCopy: ProfileModel = JSON.parse(JSON.stringify(state));
    return {
      ...stateCopy,
      address: {
        ...stateCopy.address,
        [action.field]: action.value
      }
    }
  }),
  on(setContactsData, (state, action) => {
    let stateCopy: ProfileModel = JSON.parse(JSON.stringify(state));
    console.log(stateCopy);
    return {
      ...stateCopy,
      contact: {
        ...stateCopy.contact,
        [action.field]: action.value
      }
    }
  })
);
