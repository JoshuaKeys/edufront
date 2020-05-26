import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { fetchStaffsRequest, fetchStaffsSuccess } from '../actions';
import { mergeMap, map } from 'rxjs/operators';
import { StaffsService } from '../../services/staffs.service';

@Injectable()
export class StaffsEffects {
  fetchStaffsRequest$ = createEffect(() => this.actions$.pipe(
    ofType(fetchStaffsRequest),
    mergeMap(_ => this.staffsService.getStaff().pipe(
      map(staffs => fetchStaffsSuccess({ staffs }))
    ))
  ))

  constructor(private actions$: Actions, private staffsService: StaffsService) { }
}
