import { SchoolProfile } from '../models/school-profile.interface';

export interface State {
  schoolProfile: SchoolProfile;
  wellcomePopup:{
    toched: boolean;
  }
  endPopup: {
    toched: boolean;
  }
  error: string;
}

export const initialSchoolProfileState: State = {
  schoolProfile: {},
  wellcomePopup: {
    toched: false
  },
  endPopup: {
    toched: false,
  },
  error: null
};
