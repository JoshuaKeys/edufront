import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  fetchAllSubjectsRequest,
  fetchAllSubjectsSuccess,
  postClassesSubjectsRequest,
  createSubjectRequest,
  createSubjectSuccess,
  assignToSelectedClasses,
  postClassesSubjectsSuccess,
  toggleEndModal
} from './actions';
import { mergeMap, map, withLatestFrom, tap, switchMap } from 'rxjs/operators';
import * as fromSubjectActions from './actions/index'
import { ClassesService } from 'src/app/shared/services/classes.service';
import { getAllSelectedClasses, getAssignedClasses } from './selectors';
import { Store } from '@ngrx/store';
import { SubjectsStateModel } from '../models/subjects-state.model';
import { SubjectsService } from 'src/app/shared/services/subjects.service';
import { incrementProgress } from '../../dashboard/ngrx/actions';

@Injectable()
export class SubjectsEffects {
  fetchAllSubjectsRequest$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAllSubjectsRequest),
    mergeMap(action => this.subjectsService.getAllSubjects().pipe(
      map(subjects => fetchAllSubjectsSuccess({ subjects }))
    ))
  ));
  createSubjectRequest$ = createEffect(() => this.actions$.pipe(
    ofType(createSubjectRequest),
    mergeMap(action => {
      // if(!action.subject.subSubjects) {
      //   delete action.subject.subSubjects;
      // }
      // if(!action.subject.)
      return this.subjectsService.createSubject(action.subject).pipe(
      map(subject => createSubjectSuccess({ subject }))
    )})
  ));
  fetchAllClasses$ = createEffect(() => this.actions$.pipe(
    ofType(fromSubjectActions.getClassesRequest),
    mergeMap(action => this.classesService.getClasses().pipe(
      map(classes => fromSubjectActions.getClassesSuccess({ classes }))
    ))
  ));
  assignToSelectedClassesRequest$ = createEffect(() => this.actions$.pipe(
    ofType(fromSubjectActions.assignToSelectedClassesRequest),
    withLatestFrom(this.store.select(getAllSelectedClasses)),
    map(([action, selectedSubClasses]) => {
      if (selectedSubClasses.length > 0) {
        return assignToSelectedClasses({ selectedSubClasses, subject: action.subject })
      }
      return fromSubjectActions.assignToSelectedClassesFailure()
    })
  ));
  removeFromSelectedClassesRequest$ = createEffect(() => this.actions$.pipe(
    ofType(fromSubjectActions.removeFromSelectedClassesRequest),
    withLatestFrom(this.store.select(getAllSelectedClasses)),
    map(([action, selectedSubClasses]) => {
      if (selectedSubClasses.length > 0) {
        return fromSubjectActions.removeFromSelectedClasses({ selectedSubClasses, subject: action.subject })
      }
    })
  ))
  postsClassesSubjectRequest$ = createEffect(() => this.actions$.pipe(
    ofType(postClassesSubjectsRequest),
    withLatestFrom(this.store.select(getAssignedClasses)),
    mergeMap(([action, assignedClasses]) => {
      const requestData = assignedClasses.map(classItem => {
        return {
          classId: classItem.id,
          subjectIds: classItem.subjects.map(subject => subject.id)
        }
      })
      return this.subjectsService.postClassSubjects(requestData).pipe(
        switchMap(classesSubjects => [postClassesSubjectsSuccess({ classesSubjects }), toggleEndModal(), incrementProgress()])
      )
    })
  ));
  constructor(
    private actions$: Actions,
    private subjectsService: SubjectsService,
    private classesService: ClassesService,
    private store: Store<SubjectsStateModel>
  ) { }
}
