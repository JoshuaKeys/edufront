import * as fromContainers from '../containers'

export const navigation = {
  'create-sections': {
    previous: null,
    next: 'confirmation'
  },
  'confirmation': {
    previous: 'create-sections',
    next: null
  }
}

export const routeToComponentMap = {
  'create-sections': fromContainers.CreateSectionsComponent,
  'confirmation': fromContainers.ConfirmationComponent
}
