import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { fetchGeneratedGroups, fetchGeneratedGroupsSuccess, fetchAllClasses, fetchAllClassesSuccess, deleteGroup, deleteGroupSuccess, deleteClass, deleteClassSuccess, fetchAllStudents, fetchAllStudentsSuccess, fetchAllClassesForSections, fetchAllClassesForSectionsSuccess, fetchAllClassesForSubjects, fetchAllClassesForSubjectsSuccess, fetchAllSubjects, fetchAllSubjectsSuccess, fetchAllClassesWithSubjects, removeFromSelectedConsoleSubjectsClassesRequest, removeFromSelectedConsoleSubjectsClasses, assignToSelectedConsoleSubjectsClasses, assignToSelectedConsoleSubjectsClassesRequest, createSubjectRequestFromConsole, createSubjectFromConsoleSuccess } from '../../actions/console-classes/console-classes-groups.actions';
import { ConsoleClassesService } from '../../../services/console-classes/console-classes.service';
import { mergeMap, map, tap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ConsoleClassesStateModel } from '../../../models/console-classes-state.model';
import { selectConsoleClasses, selectConsoleSubjectsSelectedClasses } from '../../selectors/console-classes';
import { of, forkJoin } from 'rxjs';
import { aggregateSectionData } from '../../../utilities';
import { fetchSectionData, aggregateSectionDataRequest, fetchSectionDataSuccess } from '../../actions/console-classes/console-sections.actions';

@Injectable()
export class ConsoleClassesEffects {
  fetchAllClasses$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAllClasses),
    withLatestFrom(this.store.select(selectConsoleClasses)),
    mergeMap(([action, classes]) => this.consoleClassesService.getClasses().pipe(
      map(classes => fetchAllClassesSuccess({ classes }))
    ))
  ))
  fetchGeneratedGroups$ = createEffect(() => this.actions$.pipe(
    ofType(fetchGeneratedGroups),
    mergeMap(action => this.consoleClassesService.getGeneratedGroups().pipe(
      map(generatedGroups => fetchGeneratedGroupsSuccess({ generatedGroups }))
    ))
  ));
  deleteGroupRequest$ = createEffect(() => this.actions$.pipe(
    ofType(deleteGroup),

    mergeMap(action => this.consoleClassesService.deleteGroup(action.group).pipe(
      map(resp => {
        console.log(resp);
        return deleteGroupSuccess({ group: action.group })
      })
    ))
  ))
  deleteClassRequest$ = createEffect(() => this.actions$.pipe(
    ofType(deleteClass),
    mergeMap(action => this.consoleClassesService.deleteClass(action.class).pipe(
      map(resp => deleteClassSuccess({ classItem: action.class }))
    ))
  ));
  getSectionData$ = createEffect(() => this.actions$.pipe(
    ofType(fetchSectionData),
    mergeMap(action => {
      return forkJoin(this.consoleClassesService.getSectionData(), this.consoleClassesService.getClasses()).pipe(
        map(([sections, classes]) => {
          // return fetchSectionDataSuccess({ sections: aggregateSectionData(sections, classes, students) })
          return aggregateSectionDataRequest({ sections, classes })
        })
      )
    })
  ))
  aggregateSectionDataRequest$ = createEffect(() => this.actions$.pipe(
    ofType(aggregateSectionDataRequest),
    mergeMap(({ sections, classes }) => {
      return forkJoin(sections.map(section => this.consoleClassesService.getStudentsInSection(section))
      ).pipe(
        map(students => {
          const strippedDownStudents = students.reduce((prev, curr) => {
            curr.forEach(item => {
              prev.push(item);
            })
            return prev;
          }, [])
          return fetchSectionDataSuccess({ sections: aggregateSectionData(sections, classes, strippedDownStudents) });
        })
      )
    })
  ));
  fetchAllStudents$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAllStudents),
    mergeMap(action => this.consoleClassesService.getAllStudents().pipe(
      map(students => fetchAllStudentsSuccess({ students }))
    ))
  ))
  fetchAllClassesForSections$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAllClassesForSections),
    withLatestFrom(this.store.select(selectConsoleClasses)),
    mergeMap(([action, classes]) => {
      if (classes.length) {
        return of(fetchAllClassesForSectionsSuccess({ classes }));
      }
      return this.consoleClassesService.getClasses().pipe(
        map(classes => fetchAllClassesForSectionsSuccess({ classes }))
      );
    })
  ))
  fetchAllClassesForSubjects$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAllClassesForSubjects),
    withLatestFrom(this.store.select(selectConsoleClasses)),
    mergeMap(([action, classes]) => {
      if (classes.length) {
        return of(fetchAllClassesWithSubjects({ classes }))
        // return of(fetchAllClassesForSubjectsSuccess({ classes }))
      }
      return this.consoleClassesService.getClasses().pipe(
        map(classes => fetchAllClassesWithSubjects({ classes }))
      )
    })
  ))
  fetchAllClassesWithSubjects$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAllClassesWithSubjects),
    mergeMap(action => forkJoin(action.classes.map(classItem => this.consoleClassesService.getFullClass(classItem))).pipe(
      map(classes => fetchAllClassesForSubjectsSuccess({ classes }))
    ))
  ))
  fetchAllSubjects$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAllSubjects),
    mergeMap(action => this.consoleClassesService.getAllSubjects().pipe(
      map(subjects => fetchAllSubjectsSuccess({ subjects }))
    ))
  ))
  removeFromSelectedClassesRequest$ = createEffect(() => this.actions$.pipe(
    ofType(removeFromSelectedConsoleSubjectsClassesRequest),
    withLatestFrom(this.store.select(selectConsoleSubjectsSelectedClasses)),
    map(([action, selectedClasses]) => {
      if (selectedClasses.length > 0) {
        return removeFromSelectedConsoleSubjectsClasses({ selectedClasses, subject: action.subject })
      }
    })
  ))
  createSubjectRequest$ = createEffect(() => this.actions$.pipe(
    ofType(createSubjectRequestFromConsole),
    mergeMap(action => {
      return this.consoleClassesService.createSubject(action.subject).pipe(
        map(subject => createSubjectFromConsoleSuccess({ subject }))
      )
    })
  ));
  assignToSelectedConsoleSubjectsClassesRequest$ = createEffect(() => this.actions$.pipe(
    ofType(assignToSelectedConsoleSubjectsClassesRequest),
    withLatestFrom(this.store.select(selectConsoleSubjectsSelectedClasses)),
    map(([action, selectedClasses]) => {
      if (selectedClasses.length > 0) {
        return assignToSelectedConsoleSubjectsClasses({ selectedClasses, subject: action.subject })
      }
    })
  ))
  constructor(
    private actions$: Actions,
    private consoleClassesService: ConsoleClassesService,
    private store: Store<ConsoleClassesStateModel>
  ) { }
}
