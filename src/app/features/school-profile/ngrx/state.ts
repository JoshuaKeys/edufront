import { SchoolProfile } from '../../../core/models/school-profile.interface';


export interface State {
  schoolProfile: SchoolProfile;
  wellcomePopup:{
    toched: false;
  }
  endPopup: {
    toched: false;
  }
  error: any
}

export const initialSchoolProfileState: State = {
  schoolProfile: null,
  wellcomePopup: {
    toched: false
  },
  endPopup: {
    toched: false,
  },
  error: null
};
