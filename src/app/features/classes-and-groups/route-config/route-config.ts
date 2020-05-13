import * as fromContainers from '../containers'

export const navigation = {
  'classes-and-groups': {
    next: 'name-groups',
    previous: '/school-profile/contact-details',
  },
  'name-groups': {
    // next: 'address',
    previous: 'classes-and-groups',
  },
  // 'address': {
  //   next: 'contact-details',
  //   previous: 'name',
  // },
  // 'contact-details' : {
  //   next: 'logo-question',
  //   previous: 'address',
  // },
  // 'logo-question': {
  //   next: 'upload-logo',
  //   previous: 'contact-details',
  // },
  // 'upload-logo': {
  //   next: 'confirmation',
  //   previous: 'logo-question',
  // },
  // confirmation: {
  //   next: 'contact-details',
  //   previous: null,
  // }
};

export const routeToComponentMap = {
  'classes-and-groups': fromContainers.ClassesAndGroupComponent,
  'name-groups': fromContainers.NameGroupsComponent,
  // 'address': fromContainers.AddressPageComponent,
  // 'contact-details': fromContainers.ContactDetailsPageComponent,
  // 'logo-question': fromContainers.LogoQuestionPageComponent,
  // 'upload-logo': fromContainers.LogoUploadPageComponent,
  // 'confirmation': fromContainers.ConfirmationPageComponent
}
