import { createAction, props } from '@ngrx/store';

export const retrieveTokenRequest = createAction(
  '[AppComponent] retrieveTokenRequest'
);
export const retrieveTokenSuccess = createAction(
  '[AuthEffects] retrieveTokenSuccess',
  props<{ token: string }>()
);
export const retrieveTokenFailure = createAction(
  '[AuthEffects] retrieveTokenFailure'
);
