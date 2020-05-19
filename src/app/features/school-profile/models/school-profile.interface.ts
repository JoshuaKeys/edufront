export interface SchoolProfile {
  name?: string;
  email?: string;
  phoneNo?: string;
  website?: string;
  logo?: string;
  addressDto?: {
    country?: string;
    zipcode?: number;
    address?: string;
    state?: string;
    city?: string;
  }
}
