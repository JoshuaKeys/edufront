import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetchStaffsRequest, fetchStaffsSuccess, fetchClassesRequest, fetchClassesSuccess, fetchSubjectsRequest, fetchSubjectSuccess } from '../actions';
import { mergeMap, map } from 'rxjs/operators';
import { StaffsService } from '../../services/staffs.service';
import { SubjectsService } from 'src/app/shared/services/subjects.service';
import { ClassesService } from 'src/app/shared/services/classes.service';

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
  constructor(
    private actions$: Actions,
    private staffsService: StaffsService,
    private subjectsService: SubjectsService,
    private classesService: ClassesService
  ) { }
}
