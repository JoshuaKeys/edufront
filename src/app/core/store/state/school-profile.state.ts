import { SchoolProfile } from '../../models/school-profile.interface';


export interface SchoolProfileState {
  schoolProfile: SchoolProfile;
  wellcomePopup:{
    toched: false;
  }
  endPopup: {
    toched: false;
  }
  error: any
}

export const initialSchoolProfileState: SchoolProfileState = {
  schoolProfile: null,
  wellcomePopup: {
    toched: false
  },
  endPopup: {
    toched: false,
  },
  error: null
};
