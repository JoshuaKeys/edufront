import { SchoolAddressModel } from './school-address.model';
import { ContactDetailsModel } from './contact-details.model';

export interface PreviewModel {
  label: string;
  values: Array<{ name: string, value: string }>;
  route?: string;
}

export interface SchoolPreviewModel {
  schoolName?: {
    name?: string;
    route?: string;
  };
  schoolAddress?: {
    country?: string;
    address?: string;
    zipCode?: number;
    state?: string;
    city?: string;
    route?: string;
  };
  schoolContact?: {
    phonePrefix?: string;
    phoneNumber?: string;
    email?: string;
    website?: string;
  };
  haveSchoolLogo?: boolean;
  schoolLogo?: {

  }
}
