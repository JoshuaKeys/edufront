import { SchoolAddressModel } from './school-address.model'

export interface CreateSchoolModel {
  name: string;
  email: string;
  phoneNo: string;
  website: string;
  id?: string;
  logo: string;
  addressDto: {
    address: string;
    city: string;
    countryId: string;
    id?: string;
    state: string;
    zipcode: number;
  }
}
