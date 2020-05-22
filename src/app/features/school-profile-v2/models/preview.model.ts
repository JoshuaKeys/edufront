import { SchoolAddressModel } from './school-address.model';
import { ContactDetailsModel } from './contact-details.model';

export interface PreviewModel {
  label: string;
  values: Array<{ name: string, value: string }>;
}
