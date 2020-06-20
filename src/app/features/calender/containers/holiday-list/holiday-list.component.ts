import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarService } from '../../services/calendar.service';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import {
  fetchHolidaysRequest,
  deleteHoliday,
  addHoliday,
  editHoliday,
  editHolidayRequest
} from '../../ngrx/actions/calendar.actions';
import { Observable } from 'rxjs';
import { HolidayModel } from '../../models/holiday.model';
import { selectAllHolidays, selectEditState } from '../../ngrx/selectors';
import { map } from 'rxjs/operators';
import { HolidayEditModel } from '../../models/holiday-edit.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edu-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HolidayListComponent implements OnInit {
  holidays: Observable<HolidayModel[]>;
  activatedRouteData = this.activatedRoute.snapshot.data;
  mode: Observable<HolidayEditModel | 'addMode'>;
  tempArr = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23
  ];
  ngOnInit(): void {
    this.holidays = this.store.select(selectAllHolidays);
    this.mode = this.store.select(selectEditState).pipe(
      map(editState => {
        if (editState) {
          return editState;
        } else {
          return 'addMode';
        }
      })
    );
    this.store.dispatch(fetchHolidaysRequest());
  }

  goNext() {
    this.router.navigate(['../', this.activatedRouteData.next], {
      relativeTo: this.activatedRoute
    });
  }
  onAddHoliday(holiday: HolidayModel) {
    this.store.dispatch(addHoliday({ holiday }));
  }
  onDeleteHoliday(holiday: HolidayModel) {
    this.store.dispatch(deleteHoliday({ holiday }));
  }
  onEditHoliday(holiday: HolidayModel) {
    this.store.dispatch(editHoliday({ holiday }));
  }
  onEditHolidayRequest(holiday: HolidayModel) {
    this.store.dispatch(editHolidayRequest({ holiday }));
  }
  constructor(
    private store: Store<CalendarStateModel>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
}
