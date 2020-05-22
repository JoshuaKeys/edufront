import { createReducer, on } from "@ngrx/store";
import { PreviewModel } from '../../models/preview.model';
import { setSchoolName, setAddressData, setContactsData } from '../actions';

const initialState: PreviewModel[] = []
export const schoolProfilePreviewReducer = createReducer(initialState,
  on(setSchoolName, (state, { schoolName }) => {
    const stateCopy: PreviewModel[] = JSON.parse(JSON.stringify(state));
    const hasSchoolName = stateCopy.findIndex(previewItem => previewItem.label === 'School Name');
    if (hasSchoolName > -1) {
      stateCopy[hasSchoolName].values[0].value = schoolName
    } else {
      stateCopy.push({
        label: 'School Name',
        values: [{ name: 'schoolName', value: schoolName }]
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
      stateCopy.push({
        label: 'School Address',
        values: [{ name: action.field, value: action.value }]
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
      stateCopy.push({
        label: 'School Contact',
        values: [{ name: action.field, value: action.value }]
      })
    }
    return stateCopy;
  })
);

