import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';
import { SectionsStateModel } from '../../models/sections-state.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { assignStudentsRequest, assignStudentsRandomly, getAggregatedResult, setAggregatedResult, createClassesWithStudents, createClassesWithStudentsSuccess, changeSectionNameRequest, changeSectionName } from '../actions/sections.actions';
import { withLatestFrom, map, mergeMap, switchMap } from 'rxjs/operators';
import { selectNotDraggedStudents, selectAllClasses, selectSections, selectAllSections, selectAggregate, selectCreateSectionData } from '../selectors/classes.selectors';
import { of } from 'rxjs';
import { AggregateModel } from '../../models/aggregate.model';
import { SectionsService } from '../../services/sections.service';
import { toggleModal } from '../actions/sections-modal.actions';
import { incrementProgress } from 'src/app/features/dashboard/ngrx/actions';
import { doNothing } from '../actions/classes.actions';

@Injectable()
export class SectionsEffects {
  assignStudentsRequest$ = createEffect(() => this.actions$.pipe(
    ofType(assignStudentsRequest),
    withLatestFrom(this.store.select(selectNotDraggedStudents)),

    map(([action, notDraggedStudents]) => {
      return assignStudentsRandomly({ students: notDraggedStudents, classId: action.classId })
    })
  ));
  getAggregatedResult$ = createEffect(() => this.actions$.pipe(
    ofType(getAggregatedResult),
    withLatestFrom(this.store.select(selectAllClasses), this.store.select(selectAllSections)),
    map(([action, classes, sections]) => {

      const mappOfClassesToSections: AggregateModel[] = sections.map(section => {
        const classItem = classes.find(classItem => classItem.class.id === section.classId)
        const sectionIdx = sections.findIndex(sectionItem => sectionItem.classId === section.classId);
        return {
          classItem: classItem.class.name,
          sections: sections[sectionIdx].sections
        }
      })
      return setAggregatedResult({ result: mappOfClassesToSections });
    })
  ))
  createClassesWithStudents$ = createEffect(() => this.actions$.pipe(
    ofType(createClassesWithStudents),
    withLatestFrom(this.store.select(selectCreateSectionData)),
    mergeMap(([action, createSecData]) => {
      console.log(createSecData)
      const filteredSecData = createSecData.filter(secItem => secItem.studentIds.length > 0)
      console.log(filteredSecData)
      if (filteredSecData.length > 0) {
        return this.sectionsService.createClassesWithStudents(filteredSecData).pipe(
          switchMap(response => [createClassesWithStudentsSuccess({ response }), toggleModal({ modal: 'endModal' }), incrementProgress()])
        )
      }
      return of(doNothing())
    })
  ))
  constructor(
    private store: Store<SectionsStateModel>,
    private actions$: Actions,
    private sectionsService: SectionsService
  ) { }
}
