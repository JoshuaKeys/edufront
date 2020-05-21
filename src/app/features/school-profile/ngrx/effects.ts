import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getCountries, getCountriesError, loadCountries, uploadFail, uploadSchoolLogo, uploadSuccess } from './actions';
import { mergeMap, map, withLatestFrom, catchError } from 'rxjs/operators';
import { SchoolProfileService } from '../school-profile.service';
import { selectorSchoolLogo } from './selectors';
import { Store } from '@ngrx/store';
import { State } from './state';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';


@Injectable()
export class SchoolProfileEffects {

  constructor(
    private actions$: Actions,
    private profileService: SchoolProfileService,
    private store: Store<State>
  ) { }

  postImage$ = createEffect(() => this.actions$.pipe(
    ofType(uploadSchoolLogo),
    withLatestFrom(this.store.select(selectorSchoolLogo)),
    mergeMap(([action, selectedLogo]) => this.profileService.postImage(selectedLogo)
      .pipe(
        map(result => uploadSuccess({ value: result.toString()})),
        catchError((error: HttpErrorResponse) => of(uploadFail({ value: {message: error.statusText, code: error.status}})))
      )
    )));

  contries$ = createEffect(() => this.actions$.pipe(
    ofType(getCountries),
    mergeMap(() => this.profileService.getCountries()
      .pipe(
        map(result => loadCountries({ value: result})),
        catchError((error: HttpErrorResponse) => of(getCountriesError({ value: {message: error.statusText, code: error.status}})))
      )
    )));

}
