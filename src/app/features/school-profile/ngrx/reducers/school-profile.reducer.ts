import { createReducer, on } from "@ngrx/store";
import { ProfileModel } from '../../models/profile.model';
import { setSchoolName, setAddressData, setContactsData, setSchoolLogo, setCountryIdData, setPhoneData } from '../actions';
const initialState: ProfileModel = {
  schoolName: null,
  schoolLogo: null
};
export const profileReducer = createReducer(initialState,
  on(setSchoolName, (state, { schoolName }) => ({ ...state, schoolName })),
  on(setCountryIdData, (state, action) => {
    let stateCopy: ProfileModel = JSON.parse(JSON.stringify(state));
    return {
      ...stateCopy,
      address: {
        ...stateCopy.address,
        countryId: action.countryId
      }
    }
  }),
  on(setPhoneData, (state, action) => {
    let stateCopy: ProfileModel = JSON.parse(JSON.stringify(state));
    const retData: ProfileModel = {
      ...stateCopy,
      contact: {
        ...stateCopy.contact,
        countryCode: action.prefix,
        phone: { phoneNum: action.phoneNum, icon: action.icon, phonePrefix: action.prefix, }
      }
    }
    return retData;
  }),
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
    return {
      ...stateCopy,
      contact: {
        ...stateCopy.contact,
        [action.field]: action.value
      }
    }
  }),
  on(setSchoolLogo, (state, action) => {
    let stateCopy: ProfileModel = JSON.parse(JSON.stringify(state));
    stateCopy.schoolLogo = action.logo;
    return stateCopy;
  })
);
