import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { retrieveAuthTokenRequest, retrieveAuthTokenSuccess, retrieveAuthTokenFailure } from './actions';
import { map } from 'rxjs/operators';
@Injectable()
export class AuthEffects {
  reloadTokenRequest$ = createEffect(() => this.actions$.pipe(
    ofType(retrieveAuthTokenRequest),
    map(() => {
      const token = localStorage.getItem('token');
      return token.length > 0 ? retrieveAuthTokenSuccess({ token }) : retrieveAuthTokenFailure();
    })
  ))
  constructor(private actions$: Actions) { }
}
