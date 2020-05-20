import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { uploadSchoolLogo, uploadSuccess } from './actions';
import { mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { SchoolProfileService } from '../school-profile.service';
import { selectorSchoolLogo } from './selectors';
import { Store } from '@ngrx/store';
import { State } from './state';


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
    mergeMap(([action, selectedLogo]) => this.profileService.postImage(selectedLogo).pipe(
      map(result => uploadSuccess({ value: result.toString()}))
    ),
    // mergeMap(file => this.profileService.postImage(file).pipe(
    //   map(result => uploadSuccess({ value: result.toString()}))
    // ))
    )));

}
