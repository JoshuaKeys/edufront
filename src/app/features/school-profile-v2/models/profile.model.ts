import { SchoolAddressModel } from './school-address.model';
import { ContactDetailsModel } from './contact-details.model';

export interface ProfileModel {
  schoolName: string,
  schoolLogo: string,
  address?: SchoolAddressModel,
  contact?: ContactDetailsModel
}
