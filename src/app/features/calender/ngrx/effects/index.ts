import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetchHolidaysRequest,
    fetchHolidaysResponse, fetchClassesAndGroups, 
    fetchClassesAndGroupsSuccess, getAllClassesRequest, getAllClassesResponse,
    updateSelectedTeachingDaysRequest,
    updateSelectedPeriods, createCalendarRequest, createCalendarSuccess, addClassesGroup, computeModifications, computedModifications, computeNewGroup } from '../actions/calendar.actions';
import { mergeMap, map, withLatestFrom, tap, switchMap } from 'rxjs/operators';
import { CalendarService } from '../../services/calendar.service';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectTeachingDays, getAllSelectedClassPeriods, selectCreateCalendarData, selectTeaching } from '../selectors';
import { areBothClassesEqual, findModifiedClassesFromGroups, computeChanges, getSubtractedClasses, removeAssembly } from '../../utilities';
import { ClassGroupModel } from '../../models/class-group.model';
import { PeriodModel } from '../../models/period.model';
import { v4 as uuid44 } from 'uuid';
import { Router } from '@angular/router';

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
    computeModifications$ = createEffect(() => this.actions$.pipe(
        ofType(computeModifications),
        withLatestFrom(this.store.select(selectTeaching)),
        switchMap(([action, teachingState]) => {
            const classes = teachingState.calendarEdit.classes.filter(classItem => classItem.selected)
            const parentClasses = teachingState.calendarEdit.group.classes;
            let teachingPeriods: PeriodModel[];
            if(!teachingState.calendarEdit.isAssemblyIncluded) {
                teachingPeriods = removeAssembly(teachingState.calendarEdit.teachingPeriods)
            }else {
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
            if(!subtractedClasses.length) {
                return [computedModifications({modifiedGroup})]
            }else {
                const newGroup: ClassGroupModel = {
                    ...teachingState.calendarEdit.group,
                    id: uuid44(),
                    groupName: `Default_Group ${teachingState.classesAndGroups.length}`
                }
                return [computedModifications({modifiedGroup}), computeNewGroup({newGroup})]
            }
        })
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
        private calendarService: CalendarService,
        private router: Router
    ){}
}