import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  fetchStaffsRequest,
  fetchStaffsSuccess,
  fetchClassesRequest,
  fetchClassesSuccess,
  fetchSubjectsRequest,
  fetchSubjectSuccess,
  addClassToSubjectRequest,
  toggleClassInSubject,
  doNothing
} from '../actions';
import { mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { StaffsService } from '../../services/staffs.service';
import { SubjectsService } from 'src/app/shared/services/subjects.service';
import { ClassesService } from 'src/app/shared/services/classes.service';
import { Store } from '@ngrx/store';
import { StaffsStateModel } from '../../models/staff-state.model';
import { selectSelectedSubject } from '../selectors';

@Injectable()
export class StaffsEffects {
  fetchStaffsRequest$ = createEffect(() => this.actions$.pipe(
    ofType(fetchStaffsRequest),
    mergeMap(_ => this.staffsService.getStaff().pipe(
      map(staffs => fetchStaffsSuccess({ staffs }))
    ))
  ))
  fetchSubjectsRequest$ = createEffect(() => this.actions$.pipe(
    ofType(fetchSubjectsRequest),
    mergeMap(action => this.subjectsService.getAllSubjects().pipe(
      map(subjects => fetchSubjectSuccess({ subjects }))
    ))
  ))
  fetchClassesRequest$ = createEffect(() => this.actions$.pipe(
    ofType(fetchClassesRequest),
    mergeMap(action => this.classesService.getClasses().pipe(
      map(classes => fetchClassesSuccess({ classes }))
    ))
  ))
  addClassToSubject$ = createEffect(() => this.actions$.pipe(
    ofType(addClassToSubjectRequest),
    withLatestFrom(this.store.select(selectSelectedSubject)),
    map(([action, selectedSubject]) => {
      if (!selectedSubject) {
        return doNothing();
      }

      return toggleClassInSubject({
        subjectId: selectedSubject.id,
        class: action.class
      })
    })
  ))
  constructor(
    private actions$: Actions,
    private staffsService: StaffsService,
    private subjectsService: SubjectsService,
    private classesService: ClassesService,
    private store: Store<StaffsStateModel>
  ) { }
}
