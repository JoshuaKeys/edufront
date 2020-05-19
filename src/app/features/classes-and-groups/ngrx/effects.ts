import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getClassesRequest, getClassesSuccess, setGroupOfClassesQty, initializeGroupClassMap, preserveGroupOfClassesQty, requestGroupsClassMap, resetAllDraggedState, classesWithoutGroupsRequest, classesWithoutGroupsSuccess, openClassesAndGroupsEndModal, sendClassesWithGroupsRequest, sendClassesWithGroupsSuccess } from './actions';
import { mergeMap, map, tap, withLatestFrom, takeWhile, switchMap } from 'rxjs/operators';
import { ClassesAndGroupsService } from '../services/classes-and-groups.service';
import { Store } from '@ngrx/store';
import { ClassesAndGroupsModel } from '../models/classes-and-group.model';
import { selectGroupsClassMap, selectNumOfGroups, selectSelectedClasses, selectGCMapForSubmission } from './selectors';
import { EMPTY, of, Observable } from 'rxjs';

@Injectable()
export class ClassesAndGroupsEffects {

  getClassesRequest$ = createEffect(() => this.actions$.pipe(
    ofType(getClassesRequest),
    mergeMap(_ => this.classesAndGroupsService.getClasses().pipe(
      map(classes => getClassesSuccess({ classes }))
    ))
  ))

  setGroupsOfClassesQty$ = createEffect(() => this.actions$.pipe(
    ofType(requestGroupsClassMap),
    withLatestFrom(this.store.select(selectGroupsClassMap), this.store.select(selectNumOfGroups)),
    map(([action, groupsClassesMap, groupsNum]) => {
      if (groupsClassesMap && +groupsNum === groupsClassesMap.length) {
        return preserveGroupOfClassesQty();
      } else {
        return initializeGroupClassMap()
      }
    })
  ))

  sendClassesWithoutGroups$ = createEffect(() => this.actions$.pipe(
    ofType(classesWithoutGroupsRequest),
    withLatestFrom(this.store.select(selectSelectedClasses)),
    tap(([action, selectedClasses]) => {
      console.log(action, selectedClasses);
    }),
    mergeMap(([action, selectedClasses]) => {
      let copyOfSelectedClasses = selectedClasses.map(item => ({ grade: item.grade, name: +item.name }))
      return this.classesAndGroupsService.sendClassesWithoutGroups(copyOfSelectedClasses)
    }),
    switchMap(response => [classesWithoutGroupsSuccess({ responseData: response }), openClassesAndGroupsEndModal()])
  ))

  sendClassesWithGroups$ = createEffect(() => this.actions$.pipe(
    ofType(sendClassesWithGroupsRequest),
    withLatestFrom(this.store.select(selectGCMapForSubmission)),
    tap(([action, selectedGroupClassMap]) => {
      console.log(selectedGroupClassMap)
    }),
    mergeMap(([action, selectedGroupClassesMap]) => this.classesAndGroupsService.sendClassesWithGroups(selectedGroupClassesMap)),
    switchMap(response => [sendClassesWithGroupsSuccess({ responseData: response }), openClassesAndGroupsEndModal()])
  ))

  preserveGroupOfClassesQty$ = createEffect(() => this.actions$.pipe(
    ofType(initializeGroupClassMap),
    map(_ => resetAllDraggedState())
  ))

  constructor(
    private actions$: Actions,
    private classesAndGroupsService: ClassesAndGroupsService,
    private store: Store<ClassesAndGroupsModel>
  ) {
  }
}
