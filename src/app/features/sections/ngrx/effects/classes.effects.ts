import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { getAllClassesRequest, getAllClassesSuccess, toggleSelectedState, doNothing, setClassStudents } from '../actions/classes.actions';
import { mergeMap, map, withLatestFrom, tap } from 'rxjs/operators';
import { SectionsService } from '../../services/sections.service';
import { ClassesModel } from '../../models/classes-model';
import { selectSelectedClass } from '../selectors/classes.selectors';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { SectionsStateModel } from '../../models/sections-state.model';
import { ProfileDTOModel } from 'src/app/shared/models/profile-dto.model';
import { ExtendedProfileDTOModel } from '../../models/extended-profiledto.model';
import { initFirstSection } from '../actions/sections.actions';

@Injectable()
export class ClassesEffects {
  getAllClassesRequest$ = createEffect(() => this.actions$.pipe(
    ofType(getAllClassesRequest),
    mergeMap(action => this.sectionsService.getClasses().pipe(
      map(classes => {
        const classStaffObj: ClassesModel[] = classes.map(classItem => ({ class: classItem }))
        return getAllClassesSuccess({ classes: classStaffObj })
      })
    ))
  ));
  toggleSelectedState$ = createEffect(() => this.actions$.pipe(
    ofType(toggleSelectedState),
    withLatestFrom(this.store.select(selectSelectedClass)), // Typescript bug
    mergeMap(([action, selectedClass]) => {
      if (!selectedClass) {
        return of(doNothing());
      }
      if (!selectedClass.students) {
        console.log(action.classGrade, selectedClass.class.id)
        return this.sectionsService.getStudents(selectedClass.class.id).pipe(
          mergeMap((students: ExtendedProfileDTOModel[]) => [
            setClassStudents({ classId: selectedClass.class.id, students }),
            initFirstSection({ classId: selectedClass.class.id })
          ])
        )
      }
      return of(doNothing())  // Up for debate
    })
  ));
  constructor(private sectionsService: SectionsService,
    private store: Store<SectionsStateModel>,
    private actions$: Actions) { }
}
