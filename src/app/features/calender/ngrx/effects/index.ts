import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetchHolidaysRequest, fetchHolidaysResponse } from '../actions/calendar.actions';
import { mergeMap, map } from 'rxjs/operators';
import { CalendarService } from '../../services/calendar.service';

@Injectable()
export class CalendarEffects {
    fetchHolidaysRequest$ = createEffect(()=> this.actions$.pipe(
        ofType(fetchHolidaysRequest),
        mergeMap(action=> this.calendarService.getHolidayList().pipe(
            map(holidays => fetchHolidaysResponse({holidays}))
        ))
    ))

    constructor(private actions$: Actions, private calendarService: CalendarService){}
}