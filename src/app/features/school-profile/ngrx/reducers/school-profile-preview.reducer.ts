import { createReducer, on } from "@ngrx/store";
import { PreviewModel, SchoolPreviewModel } from '../../models/preview.model';
import { setSchoolName, setAddressData, setContactsData, setSchoolLogo, clearLogoPreview, setPhoneData } from '../actions';

const initialState: SchoolPreviewModel = {
  schoolName: {
    route: 'school-name-question'
  },
  schoolAddress: {
    route: 'school-address-question'
  },
  schoolContact: {
    route: 'contact-details-question'
  },
  schoolLogo: {
    route: 'school-logo-question'
  }
}
export const schoolProfilePreviewReducer = createReducer(initialState,
  on(setSchoolName, (state, { schoolName }) => {
    const stateCopy: SchoolPreviewModel = JSON.parse(JSON.stringify(state));
    stateCopy.schoolName = {
      ...stateCopy.schoolName,
      name: schoolName
    };
    return stateCopy;
  }),
  on(setContactsData, (state, action) => {
    if (action.field !== 'phone') {
      const stateCopy: SchoolPreviewModel = JSON.parse(JSON.stringify(state));
      stateCopy.schoolContact = {
        ...stateCopy.schoolContact,
        [action.field]: action.value
      };
      return stateCopy;
    }
    return state;
  }),
  on(setAddressData, (state, action) => {
    const stateCopy: SchoolPreviewModel = JSON.parse(JSON.stringify(state));
    stateCopy.schoolAddress[action.field] = action.value;
    return stateCopy;
  }),
  on(setPhoneData, (state, action) => {
    const stateCopy: SchoolPreviewModel = JSON.parse(JSON.stringify(state));
    stateCopy.schoolContact = {
      ...stateCopy.schoolContact,
      phonePrefix: action.prefix,
      phoneNumber: action.phoneNum
    }
    return stateCopy;
  }),
  on(setSchoolLogo, (state, action) => {
    const stateCopy: SchoolPreviewModel = JSON.parse(JSON.stringify(state));
    stateCopy.schoolLogo = {
      ...stateCopy.schoolLogo,
      logo: action.preview
    }
    return stateCopy;
  }),
  on(clearLogoPreview, (state, action) => {
    const stateCopy: SchoolPreviewModel = JSON.parse(JSON.stringify(state));
    delete stateCopy.schoolLogo.logo
    return stateCopy;
  })
);

