export interface CreateStaffResponseModel {
  profileDto: {
    id: string;
    rollNumber: string;
    contexts: Array<string>;
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    login: string;
    gender: string;
    classId: string;
    profileImage: string;
    dob: string;
    countryId: string;
    address: string;
    city: string;
    state: string;
    zipcode: string;
    createdCode: string;
    phone: string;
    roleIds: string;
  },
  guardianDetailsDto: string
}
