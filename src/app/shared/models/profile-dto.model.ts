export interface ProfileDTOModel {
  address?: string[],
  city?: string[],
  contexts: string[],
  classId: string
  countryId?: string;
  createdCode?: boolean;
  dob?: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  id: string;
  login?: boolean;
  phone?: string;
  profileImage?: string;
  roleIds?: string[],
  rollNumber: string;
  state?: string;
  zipcode?: string;
}
