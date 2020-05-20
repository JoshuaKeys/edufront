import * as fromContainers from '../containers'

export const navigation = {
  'subjects-taught': {
    next: 'assign-subjects',
    previous: null,
  },
  'assign-subjects': {
    previous: 'subjects-taught',
    next: 'confirmation'
  },
  'confirmation': {
    previous: 'assign-subjects',
    next: null
  }
};

export const routeToComponentMap = {
  'subjects-taught': fromContainers.SubjectsTaughtQuestionComponent,
  'assign-subjects': fromContainers.AssignSubjectsQuestionComponent,
  'confirmation': fromContainers.ConfirmationComponent
}
