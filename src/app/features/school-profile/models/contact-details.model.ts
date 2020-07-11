import { PhoneIconModel } from 'src/app/shared/models/phone-icon.model';

export interface ContactDetailsModel {
  id?: string;
  phone: PhoneIconModel;
  countryCode?: string;
  email?: string;
  website?: string;
}
