import { PhoneIconModel } from './phone-icon.model';

export interface StaffModel {
  classId: string;
  contexts: string[];
  email: string;
  firstName: string;
  gender: string;
  id: string;
  isDeleted?: boolean;
  lastName: string;
  sectionId?: string;
  login: string;
  middleName: string;
  phone: string | PhoneIconModel;
  profileImage?: string;
  roles?: {
    roleId: string;
    roleName: string;
  };
  rollNumber: string;
}
