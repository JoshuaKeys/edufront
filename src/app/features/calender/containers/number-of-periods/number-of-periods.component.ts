import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CalendarModel } from '../../models/calendar.model';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectCalendar, selectTeaching } from '../../ngrx/selectors';
import { setNumberOfPeriods, assignPeriodsToTeachingDates } from '../../ngrx/actions/calendar.actions';
import { TeachingStateModel } from '../../models/teaching-state.model';

@Component({
  selector: 'edu-number-of-periods',
  templateUrl: './number-of-periods.component.html',
  styleUrls: ['./number-of-periods.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberOfPeriodsComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  calendarData: Observable<TeachingStateModel>;
  constructor(private store: Store<CalendarStateModel>, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.calendarData = this.store.select(selectTeaching);
    this.calendarData.subscribe(console.log);
  }
  onToggleActive(numberOfPeriods: number) {
    this.store.dispatch(setNumberOfPeriods({numberOfPeriods}))
    this.store.dispatch(assignPeriodsToTeachingDates({numberOfPeriods}))
  }
}
