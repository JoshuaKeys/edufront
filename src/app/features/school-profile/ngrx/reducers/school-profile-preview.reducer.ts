import { createReducer, on } from "@ngrx/store";
import { PreviewModel } from '../../models/preview.model';
import { setSchoolName, setAddressData, setContactsData, setSchoolLogo } from '../actions';

const initialState: PreviewModel[] = []
export const schoolProfilePreviewReducer = createReducer(initialState,
  on(setSchoolName, (state, { schoolName }) => {
    const stateCopy: PreviewModel[] = JSON.parse(JSON.stringify(state));
    const hasSchoolName = stateCopy.findIndex(previewItem => previewItem.label === 'School Name');
    if (hasSchoolName > -1) {
      stateCopy[hasSchoolName].values[0].value = schoolName
    } else {
      stateCopy.unshift({
        label: 'School Name',
        values: [{ name: 'schoolName', value: schoolName }],
        route: 'school-name-question'
      })
    }
    return stateCopy;
  }),
  on(setAddressData, (state, action) => {
    const stateCopy: PreviewModel[] = JSON.parse(JSON.stringify(state));
    const hasAddress = stateCopy.findIndex(previewItem => previewItem.label === 'School Address');
    if (hasAddress > -1) {
      const hasAddressField = stateCopy[hasAddress].values.findIndex(value => value.name === action.field)
      if (hasAddressField > -1) {
        stateCopy[hasAddress].values[hasAddressField].value = action.value;
      } else {
        stateCopy[hasAddress].values.push({ name: action.field, value: action.value });
      }
    } else {
      stateCopy.unshift({
        label: 'School Address',
        values: [{ name: action.field, value: action.value }],
        route: 'school-address-question'
      })
    }
    return stateCopy;
  }),
  on(setContactsData, (state, action) => {
    const stateCopy: PreviewModel[] = JSON.parse(JSON.stringify(state));
    const hasContact = stateCopy.findIndex(previewItem => previewItem.label === 'School Contact')
    if (hasContact > -1) {
      const hasContactField = stateCopy[hasContact].values.findIndex(value => value.name === action.field);
      if (hasContactField > -1) {
        stateCopy[hasContact].values[hasContactField].value = action.value;
      } else {
        stateCopy[hasContact].values.push({ name: action.field, value: action.value });
      }
    } else {
      stateCopy.unshift({
        label: 'School Contact',
        values: [{ name: action.field, value: action.value }],
        route: 'contact-details-question'
      })
    }
    return stateCopy;
  }),
  on(setSchoolLogo, (state, action) => {
    const stateCopy: PreviewModel[] = JSON.parse(JSON.stringify(state));
    const hasImg = stateCopy.findIndex(previewItem => previewItem.label === 'School Logo')
    if (hasImg > -1) {
      stateCopy[hasImg].values[0] = { name: 'schoolLogo', value: action.logo };
    } else {
      stateCopy.unshift({
        label: 'School Logo',
        values: [{ name: 'schoolLogo', value: action.preview }],
        route: 'school-logo-upload'
      })
    }
    return stateCopy;
  })
);

