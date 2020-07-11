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
  // on(setSchoolName, (state, { schoolName }) => {
  //   const stateCopy: PreviewModel[] = JSON.parse(JSON.stringify(state));
  //   const hasSchoolName = stateCopy.findIndex(previewItem => previewItem.label === 'School Name');
  //   if (hasSchoolName > -1) {
  //     stateCopy[hasSchoolName].values[0].value = schoolName
  //   } else {
  //     stateCopy.unshift({
  //       label: 'School Name',
  //       values: [{ name: 'schoolName', value: schoolName }],
  //       route: 'school-name-question'
  //     })
  //   }
  //   return stateCopy;
  // }),

  // on(setContactsData, (state, action) => {
  //   const stateCopy: PreviewModel[] = JSON.parse(JSON.stringify(state));
  //   const hasContact = stateCopy.findIndex(previewItem => previewItem.label === 'School Contact')
  //   if (hasContact > -1) {
  //     const hasContactField = stateCopy[hasContact].values.findIndex(value => value.name === action.field);
  //     if (hasContactField > -1) {
  //       stateCopy[hasContact].values[hasContactField].value = action.value;
  //     } else {
  //       stateCopy[hasContact].values.push({ name: action.field, value: action.value });
  //     }
  //   } else {
  //     stateCopy.unshift({
  //       label: 'School Contact',
  //       values: [{ name: action.field, value: action.value }],
  //       route: 'contact-details-question'
  //     })
  //   }
  //   return stateCopy;
  // }),
  // on(setSchoolLogo, (state, action) => {
  //   const stateCopy: PreviewModel[] = JSON.parse(JSON.stringify(state));
  //   const hasImg = stateCopy.findIndex(previewItem => previewItem.label === 'School Logo')
  //   if (hasImg > -1) {
  //     stateCopy[hasImg].values[0] = { name: 'schoolLogo', value: action.preview };
  //   } else {
  //     stateCopy.unshift({
  //       label: 'School Logo',
  //       values: [{ name: 'schoolLogo', value: action.preview }],
  //       route: 'school-logo-upload'
  //     })
  //   }
  //   return stateCopy;
  // }),
  // on(clearLogoPreview, (state, action)=> {
  //   const stateCopy: PreviewModel[] = JSON.parse(JSON.stringify(state));
  //   const hasImg = stateCopy.findIndex(previewItem => previewItem.label === 'School Logo')
  //   if(hasImg > -1) {
  //     delete stateCopy[hasImg];
  //   }
  //   return stateCopy;
  // })
);

