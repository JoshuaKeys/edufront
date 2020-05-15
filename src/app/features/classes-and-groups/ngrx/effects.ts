import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getClassesRequest, getClassesSuccess } from './actions';
import { mergeMap, map, tap } from 'rxjs/operators';
import { ClassesAndGroupsService } from '../services/classes-and-groups.service';

@Injectable()
export class ClassesAndGroupsEffects {
  getClassesRequest$ = createEffect(() => this.actions$.pipe(
    ofType(getClassesRequest),
    mergeMap(_ => this.classesAndGroupsService.getClasses().pipe(
      map(classes => getClassesSuccess({ classes }))
    ))
  ))
  constructor(
    private actions$: Actions,
    private classesAndGroupsService: ClassesAndGroupsService
  ) {
  }
}
