import { SchoolProfile } from '../models/school-profile.interface';

export interface State {
  schoolProfile: SchoolProfile;
  wellcomePopup:{
    toched: boolean;
  }
  endPopup: {
    toched: boolean;
  }
  error?: error;
  counties?: any;
}

export const initialSchoolProfileState: State = {
  schoolProfile: {},
  wellcomePopup: {
    toched: false
  },
  endPopup: {
    toched: false,
  },
  error: {},
  counties: {}
};


export interface error {
  code?: number;
  message?: string;
}
