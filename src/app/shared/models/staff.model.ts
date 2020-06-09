export interface StaffModel {
  classId: string;
  contexts: string[];
  email: string;
  firstName: string;
  gender: string;
  id: string;
  isDeleted: boolean;
  lastName: string;
  login: string;
  middleName: string;
  profileImage: string;
  roles: {
    roleId: string;
    roleName: string;
  };
  rollNumber: string;
}
