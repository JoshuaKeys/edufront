import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { uploadSchoolLogo, uploadSuccess } from './actions';
import { mergeMap, map } from 'rxjs/operators';
import { SchoolProfileService } from '../school-profile.service';


@Injectable()
export class SchoolProfileEffects {

  constructor(
    private actions$: Actions,
    private profileService: SchoolProfileService
  ) { }

  postImage$ = createEffect(() => this.actions$.pipe(
    ofType(uploadSchoolLogo),
    mergeMap(file => this.profileService.postImage(file).pipe(
      map(result => uploadSuccess({ value: result.toString()}))
    ))
  ));

}
