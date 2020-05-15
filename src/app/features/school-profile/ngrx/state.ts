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
/*
export interface SchoolProfile {
  name?: string;
  email?: string;
  phoneNo?: string;
  website?: string;
  logo?: string;
  addressDto?: {
    country?: string;
    zipcode?: number;
    address?: string;
    state?: string;
    city?: string;
  }
} */
