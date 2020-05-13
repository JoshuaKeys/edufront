import { SchoolProfile } from '../../models/school-profile.interface';


export interface SchoolProfileState {
  schoolProfile: SchoolProfile;
  error: any
}

export const initialSchoolProfileState: SchoolProfileState = {
  schoolProfile: null,
  error: null
};
