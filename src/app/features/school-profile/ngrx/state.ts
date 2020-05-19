import { SchoolProfile } from '../models/school-profile.interface';


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
  // schoolProfile: {
  //   name: null,
  //   addressDto: {
  //     country: null,
  //     zipcode: null,
  //     address: null,
  //     state: null,
  //     city: null
  //   }
  // },
  schoolProfile: {},
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
