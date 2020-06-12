import * as fromContainers from '../containers'

export const navigation = {
  'school-name-question': {
    next: 'school-address-question',
    previous: '/dashboard',
  },
  'school-address-question': {
    next: 'contact-details-question',
    previous: '/dashboard'
  },
  'contact-details-question': {
    next: 'school-logo-question',
    previous: '/dashboard'
  },
  'school-logo-question': {
    next: 'school-logo-upload',
    previous: '/dashboard',
  },
  'school-logo-upload': {
    next: 'school-profile-confirmation',
    previous: '/dashboard'
  },
  'school-profile-confirmation': {
    next: null,
    previous: '/ashboard'
  }
};

export const routeToComponentMap = {
  'school-name-question': fromContainers.SchoolNameQuestionComponent,
  'school-address-question': fromContainers.SchoolAddressQuestionComponent,
  'contact-details-question': fromContainers.ContactDetailsQuestionComponent,
  'school-logo-question': fromContainers.SchoolLogoQuestionComponent,
  'school-logo-upload': fromContainers.SchoolLogoUploadComponent,
  'school-profile-confirmation': fromContainers.SchoolProfileConfirmationComponent
};
