import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetchAllSubjectsRequest, fetchAllSubjectsSuccess, createSubjectRequest, createSubjectSuccess } from './actions';
import { mergeMap, map } from 'rxjs/operators';
import { SubjectsService } from '../services/subjects.services';
import * as fromSubjectActions from './actions/index'
import { ClassesService } from 'src/app/shared/services/classes.service';

@Injectable()
export class SubjectsEffects {

  fetchAllSubjectsRequest$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAllSubjectsRequest),
    mergeMap(action => this.subjectsService.getAllSubjects().pipe(
      map(subjects => fetchAllSubjectsSuccess({ subjects }))
    ))
  ))
  createSubjectRequest$ = createEffect(() => this.actions$.pipe(
    ofType(createSubjectRequest),
    mergeMap(action => this.subjectsService.createSubject(action.subject).pipe(
      map(subject => createSubjectSuccess({ subject }))
    ))
  ))
  fetchAllClasses$ = createEffect(() => this.actions$.pipe(
    ofType(fromSubjectActions.getClassesRequest),
    mergeMap(action => this.classesService.getClasses().pipe(
      map(classes => fromSubjectActions.getClassesSuccess({ classes }))
    ))
  ))
  constructor(
    private actions$: Actions,
    private subjectsService: SubjectsService,
    private classesService: ClassesService
  ) { }
}
