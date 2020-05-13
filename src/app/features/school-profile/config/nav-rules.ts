import * as fromContainers from '../containers';

export const navigation = {
  'wellcome': {
    next: 'name',
    previous: null,
  },
  'name': {
    next: 'address',
    previous: 'wellcome',
  },
  'address': {
    next: 'contact-details',
    previous: 'name',
  },
  'contact-details' : {
    next: 'logo-question',
    previous: 'address',
  },
  'logo-question': {
    next: 'upload-logo',
    previous: 'contact-details',
  },
  'upload-logo': {
    next: 'confirmation',
    previous: 'logo-question',
  },
  confirmation: {
    next: 'contact-details',
    previous: null,
  }
};

export const routeToComponentMap = {
  'wellcome': fromContainers.SchoolProfilePageComponent,
  'name': fromContainers.NamePageComponent,
  'address': fromContainers.AddressPageComponent,
  'contact-details': fromContainers.ContactDetailsPageComponent,
  'logo-question': fromContainers.LogoQuestionPageComponent,
  'upload-logo': fromContainers.LogoUploadPageComponent,
  'confirmation': fromContainers.ConfirmationPageComponent
}
