import { createAction, props } from '@ngrx/store';

export const retrieveAuthTokenRequest = createAction(
  '[AppComponent] retrieveAuthTokenRequest'
)
export const retrieveAuthTokenSuccess = createAction(
  '[AuthEffects API] retrieveAuthTokenSuccess',
  props<{ token: string }>()
)
export const retrieveAuthTokenFailure = createAction(
  '[AuthEffects API] retrieveAuthTokenFailure'
)
