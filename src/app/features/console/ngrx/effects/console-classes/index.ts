import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { fetchGeneratedGroups, fetchGeneratedGroupsSuccess, fetchAllClasses, fetchAllClassesSuccess } from '../../actions/console-classes';
import { ConsoleClassesService } from '../../../services/console-classes/console-classes.service';
import { mergeMap, map, tap } from 'rxjs/operators';

@Injectable()
export class ConsoleClassesEffects {
  fetchAllClasses$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAllClasses),
    mergeMap(action => this.consoleClassesService.getClasses().pipe(
      map(classes => fetchAllClassesSuccess({ classes }))
    ))
  ))
  fetchGeneratedGroups$ = createEffect(() => this.actions$.pipe(
    ofType(fetchGeneratedGroups),
    mergeMap(action => this.consoleClassesService.getGeneratedGroups().pipe(
      map(generatedGroups => fetchGeneratedGroupsSuccess({ generatedGroups }))
    ))
  ))
  constructor(private actions$: Actions, private consoleClassesService: ConsoleClassesService) { }
}
