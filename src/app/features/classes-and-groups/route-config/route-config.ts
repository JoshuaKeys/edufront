import * as fromContainers from '../containers'

export const navigation = {
  'classes-in-school': {
    next: 'create-group-question',
    previous: '/school-profile/contact-details',
  },
  'create-group-question': {
    next: 'classes-with-groups',
    previous: 'classes-in-school'
  },
  'classes-with-groups': {
    next: 'name-groups',
    previous: 'create-group-question'
  },
  'name-groups': {
    // next: 'address',
    previous: 'classes-with-groups',
  },
};

export const routeToComponentMap = {
  'classes-in-school': fromContainers.ClassesInSchoolComponent,
  'create-group-question': fromContainers.CreateGroupsQuestionComponent,
  'classes-with-groups': fromContainers.ClassesAndGroupComponent,
  'name-groups': fromContainers.NameGroupsComponent
}
