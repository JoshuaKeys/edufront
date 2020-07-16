import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  fetchHolidaysRequest,
  fetchHolidaysResponse, fetchClassesAndGroups,
  fetchClassesAndGroupsSuccess, getAllClassesRequest, getAllClassesResponse,
  updateSelectedTeachingDaysRequest,
  updateSelectedPeriods, createCalendarRequest, createCalendarSuccess, addClassesGroup, computeModifications, computedModifications, computeNewGroup, editHoliday, editHolidaySuccess, deleteHoliday, deleteHolidaySuccess, sendCalendarData, editCalendar, setAssemblyEnabledMode, requestUpdatedDetails, setConsequences
} from '../actions/calendar.actions';
import { mergeMap, map, withLatestFrom, tap, switchMap } from 'rxjs/operators';
import { CalendarService } from '../../services/calendar.service';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectTeachingDays, getAllSelectedClassPeriods, selectCreateCalendarData, selectTeaching, selectCalendar } from '../selectors';
import { areBothClassesEqual, findModifiedClassesFromGroups, computeChanges, getSubtractedClasses, removeAssembly, extractTimetableData, computeScenarios } from '../../utilities';
import { ClassGroupModel } from '../../models/class-group.model';
import { PeriodModel } from '../../models/period.model';
import { v4 as uuid44 } from 'uuid';
import { Router } from '@angular/router';
import { HolidayModel } from '../../models/holiday.model';
import { of } from 'rxjs';
import { TimeTablePlanner } from '../../models/time-table-planner.model';
import { toggleEndModal } from '../actions';
import { incrementProgress } from 'src/app/features/dashboard/ngrx/actions';

@Injectable()
export class CalendarEffects {
  fetchHolidaysRequest$ = createEffect(() => this.actions$.pipe(
    ofType(fetchHolidaysRequest),
    mergeMap(action => this.calendarService.getHolidayList().pipe(
      map(holidays => fetchHolidaysResponse({ holidays }))
    ))
  ))
  fetchClassesAndGroupsRequest = createEffect(() => this.actions$.pipe(
    ofType(fetchClassesAndGroups),
    withLatestFrom(this.store.select(selectTeachingDays), this.store.select(selectTeaching)),
    mergeMap(([action, teachingDays, teachingState]) => {
      if (teachingState.classesAndGroups.length > 0) {
        return of(fetchClassesAndGroupsSuccess({ classesAndGroups: teachingState.classesAndGroups }))
      }
      return this.calendarService.getClassesAndGroups().pipe(
        map(_classesAndGroups => {
          const classesAndGroups = _classesAndGroups.filter(item => item.classes.length).map(
            classAndGroup => {
              classAndGroup.teachingDays = teachingDays
              return classAndGroup
            }
          )
          return fetchClassesAndGroupsSuccess({ classesAndGroups })
        })
      )
    })
  ))
  getAllClassesRequest$ = createEffect(() => this.actions$.pipe(
    ofType(getAllClassesRequest),
    mergeMap(action => this.calendarService.getAllClasses().pipe(
      map(classes => getAllClassesResponse({ classes }))
    ))
  ))
  requestUpdateDetails = createEffect(() => this.actions$.pipe(
    ofType(requestUpdatedDetails),
    withLatestFrom(this.store.select(selectTeaching)),
    map(([action, teachingState]) => {
      const consequences: string[] = computeScenarios(teachingState.calendarEdit)
      return setConsequences({ consequences });
    })
  ))
  computeModifications$ = createEffect(() => this.actions$.pipe(
    ofType(computeModifications),
    withLatestFrom(this.store.select(selectTeaching)),
    switchMap(([action, teachingState]) => {
      const classes = teachingState.calendarEdit.classes.filter(classItem => classItem.selected)
      const parentClasses = teachingState.calendarEdit.group.classes;
      let teachingPeriods: PeriodModel[];
      if (!teachingState.calendarEdit.isAssemblyIncluded) {
        teachingPeriods = removeAssembly(teachingState.calendarEdit.teachingPeriods)
      } else {
        teachingPeriods = teachingState.calendarEdit.teachingPeriods
      }
      const subtractedClasses = getSubtractedClasses(
        teachingState.calendarEdit.group,
        classes
      );
      const modifiedGroup: ClassGroupModel = {
        ...teachingState.calendarEdit.group,
        classes,
        teachingDays: teachingState.calendarEdit.teachingDays,
        periods: teachingPeriods
      }
      this.router.navigateByUrl('/calendar/calendar-confirmation');
      if (!subtractedClasses.length) {
        return [computedModifications({ modifiedGroup })]
      } else {
        console.log(subtractedClasses);
        const newGroup: ClassGroupModel = {
          ...teachingState.calendarEdit.group,
          classes: subtractedClasses,
          id: uuid44(),
          groupName: `Default_Group ${teachingState.classesAndGroups.length}`
        }
        console.log(newGroup);
        return [computedModifications({ modifiedGroup }), computeNewGroup({ newGroup })]
      }
    })
  ))
  editHoliday$ = createEffect(() => this.actions$.pipe(
    ofType(editHoliday),
    mergeMap(action => {
      if (action.holiday.id) {
        return this.calendarService.editHoliday(action.holiday).pipe(
          map((holiday: HolidayModel) => {
            holiday.mockId = action.holiday.mockId
            console.log(holiday.mockId)
            return editHolidaySuccess({ holiday })
          })
        )
      } else {
        return of(editHolidaySuccess({ holiday: action.holiday }))
      }
    })
  ))
  deleteHoliday$ = createEffect(() => this.actions$.pipe(
    ofType(deleteHoliday),
    mergeMap(action => {
      if (action.holiday.id) {
        return this.calendarService.deleteHoliday(action.holiday).pipe(
          map(() => deleteHolidaySuccess({ holiday: action.holiday }))
        )
      }
      return of(deleteHolidaySuccess({ holiday: action.holiday }));
    })
  ))
  updateSelectedTeachingDaysRequest$ = createEffect(() => this.actions$.pipe(
    ofType(updateSelectedTeachingDaysRequest),
    withLatestFrom(this.store.select(getAllSelectedClassPeriods)),
    map(([action, selectedPeriods]) => {
      return updateSelectedPeriods({ updateTo: action.updateTo, selectedPeriods });
    })
  ));
  createCalendarRequest$ = createEffect(() => this.actions$.pipe(
    ofType(createCalendarRequest),
    withLatestFrom(this.store.select(selectCreateCalendarData)),
    tap(([action, calendarCreate]) => {
      console.log(calendarCreate)
    }),
    mergeMap(([action, calendarCreate]) => this.calendarService.createCalendar(calendarCreate).pipe(
      map(calendarResponse => {
        localStorage.setItem('termId', calendarResponse.term.termDetailsDtos[0].termId);
        localStorage.setItem('academicYearId', calendarResponse.term.termDetailsDtos[0].academicYearId)
        return createCalendarSuccess({ calendarResponse })
      })
    ))
  ))
  looseFocus$ = createEffect(() => this.actions$.pipe(
    ofType(addClassesGroup),
    tap(() => {
      document.body.click();
    })
  ), { dispatch: false });
  sendCalendarData = createEffect(() => this.actions$.pipe(
    ofType(sendCalendarData),
    withLatestFrom(this.store.select(selectTeaching)),
    mergeMap(([action, calendarState]) => {
      const api = extractTimetableData(calendarState)
      console.log(api);
      return this.calendarService.createTimetablePlanner(api).pipe(
        mergeMap(response => [toggleEndModal(), incrementProgress()])
      )
    })
  ));
  editCalendar$ = createEffect(() => this.actions$.pipe(
    ofType(editCalendar),
    map(action => {
      if (action.group.periods[0].assembly.name.length) {
        return setAssemblyEnabledMode({ isEnabled: true })
      }
      return setAssemblyEnabledMode({ isEnabled: false })
    })
  ))
  constructor(private actions$: Actions,
    private store: Store<CalendarStateModel>,
    private calendarService: CalendarService,
    private router: Router
  ) { }
}
