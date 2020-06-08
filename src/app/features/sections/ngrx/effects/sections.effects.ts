import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { SectionsStateModel } from '../../models/sections-state.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { assignStudentsRequest, assignStudentsRandomly } from '../actions/sections.actions';
import { withLatestFrom, map, mergeMap } from 'rxjs/operators';
import { selectNotDraggedStudents } from '../selectors/classes.selectors';
import { of } from 'rxjs';

@Injectable()
export class SectionsEffects {
  assignStudentsRequest$ = createEffect(() => this.actions$.pipe(
    ofType(assignStudentsRequest),
    withLatestFrom(this.store.select(selectNotDraggedStudents)),

    map(([action, notDraggedStudents]) => {
      return assignStudentsRandomly({ students: notDraggedStudents, classId: action.classId })
    })
  ))
  constructor(private store: Store<SectionsStateModel>, private actions$: Actions) { }
}
