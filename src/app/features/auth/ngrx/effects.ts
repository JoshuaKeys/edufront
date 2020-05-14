import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { retrieveTokenSuccess, retrieveTokenFailure, retrieveTokenRequest } from './actions';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  retrieveTokenRequest$ = createEffect(() => this.actions$.pipe(
    ofType(retrieveTokenRequest),
    map(_ => {
      const token = localStorage.getItem('token');

      return  (token && token.length) > 0 ? retrieveTokenSuccess({ token }) : retrieveTokenFailure();
    })
  ))
  retrieveTokenFailure$ = createEffect(() => this.actions$.pipe(
    ofType(retrieveTokenFailure),
    tap(_ => this.router.navigateByUrl('/sign-in'))
  ), { dispatch: false })
  constructor(
    private actions$: Actions,
    private router: Router
  ) { }
}
