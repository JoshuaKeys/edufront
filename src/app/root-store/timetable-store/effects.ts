import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { TimetableFeatureState } from './state';
import {
  map,
  switchMap,
  catchError,
  flatMap,
  withLatestFrom
} from 'rxjs/operators';
import {
  getDayPlannerAction,
  getDayPlannerSuccessAction,
  getDayPlannerFailureAction,
  getSubjectsAction,
  getSubjectsSuccessAction,
  getSubjectsFailureAction,
  getTeachersSuccessAction,
  submitTimetableAction,
  submitTimetableSuccessAction,
  submitTimetableFailureAction,
  getTimetableDataAction,
  getTimetableDataSuccessAction,
  getTimetableDataFailureAction,
  updateTimetablePeriodAction,
  updateTimetableAPIDataWithSubjectsTeachersSuccessAction,
  updateTimetableAPIDataWithSubjectsTeachersAction
} from './actions';
import { of, combineLatest } from 'rxjs';
import { TimetableService } from 'src/app/services/timetable/timetable.service';
import { ITeacher } from 'src/app/shared/models/subject.model';
import {
  selectTeachers,
  selectSubjects,
  selectTimetableAPIData
} from './selectors';

@Injectable()
export class TimetableEffects {
  getDayPlannerEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDayPlannerAction),
      switchMap(action =>
        this.timetableService.getDayPlanner(action.classId).pipe(
          map(res => getDayPlannerSuccessAction({ res })),
          catchError(error => of(getDayPlannerFailureAction({ error })))
        )
      )
    )
  );

  getSubjectsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getSubjectsAction),
      switchMap(action =>
        this.timetableService.getAllSubjects(action.classId).pipe(
          flatMap(subjects => {
            let teachers = subjects
              .map(subj => {
                return subj.teachers.map(teacher => ({
                  ...teacher,
                  subjRefId: subj.id
                }));
              })
              .flat()
              .reduce((tchrs, item) => {
                if (tchrs[item.profileId]) {
                  return {
                    ...tchrs,
                    [item.profileId]: {
                      ...tchrs[item.profileId],
                      subjRefId: tchrs[item.profileId].subjRefId.concat(
                        item.subjRefId
                      )
                    }
                  };
                }
                return {
                  ...tchrs,
                  [item.profileId]: {
                    ...item,
                    subjRefId: [item.subjRefId]
                  }
                };
              }, {});

            teachers = Object.keys(teachers).map(key => teachers[key]);

            const subjectsWithTeachers = subjects.map(subj => ({
              ...subj,
              teacherIds: subj.teachers.map(t => t.profileId)
            }));
            return [
              getSubjectsSuccessAction({ subjects: subjectsWithTeachers }),
              getTeachersSuccessAction({ teachers: teachers as ITeacher[] }),
              updateTimetableAPIDataWithSubjectsTeachersAction()
            ];
          }),
          catchError(({ error }) =>
            of(
              getSubjectsSuccessAction({ subjects: [] }),
              getTeachersSuccessAction({ teachers: [] }),
              getSubjectsFailureAction({ error })
            )
          )
        )
      )
    )
  );

  updateTimetableAPIDataEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTimetableAPIDataWithSubjectsTeachersAction),
      switchMap(() => {
        return combineLatest([
          this.store.pipe(select(selectTimetableAPIData)),
          this.store.pipe(select(selectSubjects)),
          this.store.pipe(select(selectTeachers))
        ]);
      }),
      map(([apiData, subjects, teachers]) => {
        const res = apiData.reduce((acc, item) => {
          const teacher = teachers.find(t => t.profileId === item.teacherId);
          const subj = subjects.find(s => s.id === item.subjectId);
          return {
            ...acc,
            [`${item.classId}--${item.sectionId}--${item.periodId}`]: {
              periodId: item.periodId,
              period: {
                periodId: item.periodId
              },
              data: [subj, teacher]
            }
          };
        }, {});
        return updateTimetableAPIDataWithSubjectsTeachersSuccessAction(res);
      })
    )
  );

  submitTimetableEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(submitTimetableAction),
      switchMap(action =>
        this.timetableService.submitTimetable(action.timetable).pipe(
          map(timetable => submitTimetableSuccessAction({ timetable })),
          catchError(error => of(submitTimetableFailureAction({ error })))
        )
      )
    )
  );

  getTimetableDataEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getTimetableDataAction),
      switchMap(() =>
        this.timetableService.getAllPeriodsData().pipe(
          flatMap(data => {
            return [getTimetableDataSuccessAction({ data })];
          }),
          catchError(error => of(getTimetableDataFailureAction({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<TimetableFeatureState>,
    private timetableService: TimetableService
  ) {}
}
