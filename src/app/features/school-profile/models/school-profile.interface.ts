export interface SchoolProfile {
  name?: string;
  email?: string;
  phoneNo?: string;
  website?: string;
  logo?: string;
  image64?: string;
  addressDto?: {
    country?: string;
    zipcode?: number;
    address?: string;
    state?: string;
    city?: string;
    countryId?: string;
  }
}

export interface schoolDetail {
  phoneNo: string;
  email: string;
  website: string
}
