import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetchHolidaysRequest,
    fetchHolidaysResponse, fetchClassesAndGroups, 
    fetchClassesAndGroupsSuccess, getAllClassesRequest, getAllClassesResponse,
    updateSelectedTeachingDaysRequest,
    updateSelectedPeriods, createCalendarRequest, createCalendarSuccess, addClassesGroup } from '../actions/calendar.actions';
import { mergeMap, map, withLatestFrom, tap } from 'rxjs/operators';
import { CalendarService } from '../../services/calendar.service';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectTeachingDays, getAllSelectedClassPeriods, selectCreateCalendarData } from '../selectors';

@Injectable()
export class CalendarEffects {
    fetchHolidaysRequest$ = createEffect(()=> this.actions$.pipe(
        ofType(fetchHolidaysRequest),
        mergeMap(action=> this.calendarService.getHolidayList().pipe(
            map(holidays => fetchHolidaysResponse({holidays}))
        ))
    ))
    fetchClassesAndGroupsRequest = createEffect(() => this.actions$.pipe(
        ofType(fetchClassesAndGroups),
        withLatestFrom(this.store.select(selectTeachingDays)),
        mergeMap(([action, teachingDays]) => this.calendarService.getClassesAndGroups().pipe(
            map(_classesAndGroups => {
                const  classesAndGroups = _classesAndGroups.filter(item => item.classes.length).map(
                    classAndGroup=> {
                        classAndGroup.teachingDays = teachingDays
                        return classAndGroup
                    }
                )
                return fetchClassesAndGroupsSuccess({classesAndGroups})
            })
        ))
    ))
    getAllClassesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(getAllClassesRequest),
        mergeMap(action=> this.calendarService.getAllClasses().pipe(
            map(classes=> getAllClassesResponse({classes}))
        ))
    ))
    updateSelectedTeachingDaysRequest$ = createEffect(() => this.actions$.pipe(
        ofType(updateSelectedTeachingDaysRequest),
        withLatestFrom(this.store.select(getAllSelectedClassPeriods)),
        map(([action, selectedPeriods]) => {
            return updateSelectedPeriods({updateTo: action.updateTo, selectedPeriods});
        })
    ));
    createCalendarRequest$ = createEffect(() => this.actions$.pipe(
        ofType(createCalendarRequest),
        withLatestFrom(this.store.select(selectCreateCalendarData)),
        mergeMap(([action, calendarCreate])=> this.calendarService.createCalendar(calendarCreate).pipe(
            map(calendarResponse => createCalendarSuccess({calendarResponse}))
        ))
    ))
    looseFocus$ = createEffect(() => this.actions$.pipe(
        ofType(addClassesGroup),
        tap(()=> {
            document.body.click();
        })
    ), {dispatch: false})
    constructor(private actions$: Actions,
        private store: Store<CalendarStateModel>,
        private calendarService: CalendarService
    ){}
}