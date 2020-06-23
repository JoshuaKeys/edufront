import { CountryModel } from '../../school-profile/models/country.model'
import { PhoneIconModel } from 'src/app/shared/models/phone-icon.model'
import { ImageUploadModel } from 'src/app/shared/models/image-upload.model'


export interface StaffFormModel {
  address: string;
  city: string;
  country: CountryModel,
  dob: string;
  email: string;
  familyName: string;
  firstName: string;
  id?:string;
  middleName: string;
  phone: PhoneIconModel,
  profilePic: ImageUploadModel;
  sex: string;
  state: string;
  zip: string;
}
