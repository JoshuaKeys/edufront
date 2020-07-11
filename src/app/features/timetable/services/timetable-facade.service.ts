import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { TimetableFeatureState } from '../ngrx/state';
import {
  getDayPlannerAction,
  getClassesAction,
  getSectionsAction,
  getTeachersAction,
  getSubjectsAction,
  updateTimetablePeriodAction,
  submitTimetableAction
} from '../ngrx/actions';
import {
  selectTimetableSkeleton,
  selectTimetableSkeletonUI,
  selectTeachers,
  selectSubjects,
  selectTimetableData,
  selectUi,
  selectSubjectsUI
} from '../ngrx/selectors';
import { IClassSectionPeriodModel } from 'src/app/core/models/timetable';
import {
  createSubjectRequest,
  createSubjectSuccess
} from '../../subjects/ngrx/actions';
import { CreateSubjModel } from 'src/app/shared/models/create-subject.model';
import { mapTo } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TimetableFacadeService {
  UI$ = this.store.pipe(select(selectUi));
  skeleton$ = this.store.pipe(select(selectTimetableSkeleton));
  skeletonUI$ = this.store.pipe(select(selectTimetableSkeletonUI));
  // classes$ = this.store.pipe(select(selectTimetableSkeleton));
  // sections$ = this.store.pipe(select(selectTimetableSkeleton));
  subjects$ = this.store.pipe(select(selectSubjects));
  subjectsUI$ = this.store.pipe(select(selectSubjectsUI));
  teachers$ = this.store.pipe(select(selectTeachers));
  timetableData$ = this.store.pipe(select(selectTimetableData));
  subjectCreated$ = this.actions$.pipe(
    ofType(createSubjectSuccess),
    mapTo(true)
  );
  constructor(
    private store: Store<TimetableFeatureState>,
    private actions$: Actions
  ) {}

  getSekeletonByClassId(classId: string) {
    this.store.dispatch(getDayPlannerAction({ classId }));
  }

  getClasses() {
    this.store.dispatch(getClassesAction());
  }
  getSections() {
    this.store.dispatch(getSectionsAction());
  }
  getTeachers() {
    this.store.dispatch(getTeachersAction());
  }
  getSubjects(classId: string) {
    this.store.dispatch(getSubjectsAction({ classId }));
  }

  updateTimetableData(data: {
    classId: string;
    sectionId: string;
    periodId: string;
    period: any;
    data: any[];
    // teacherId: string;
    // subjectId: string;
  }) {
    this.store.dispatch(updateTimetablePeriodAction(data));
  }

  submitTimetable(timetable: IClassSectionPeriodModel) {
    this.store.dispatch(submitTimetableAction({ timetable }));
  }

  createSubjectRequest(subject: CreateSubjModel) {
    this.store.dispatch(createSubjectRequest({ subject }));
  }
}
