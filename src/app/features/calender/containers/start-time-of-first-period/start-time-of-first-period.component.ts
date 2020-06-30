import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarModel } from '../../models/calendar.model';
import {
  setStartTime,
  setAllStartTime
} from '../../ngrx/actions/calendar.actions';
import { selectCalendar, selectTeaching } from '../../ngrx/selectors';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edu-start-time-of-first-period',
  templateUrl: './start-time-of-first-period.component.html',
  styleUrls: ['./start-time-of-first-period.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartTimeOfFirstPeriodComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  constructor(
    private store: Store<CalendarModel>,
    private activatedRoute: ActivatedRoute
  ) {}
  startTimeForm: FormGroup;
  ngOnInit(): void {
    this.store.select(selectTeaching).subscribe(teaching => {
      this.startTimeForm = new FormGroup({
        startTime: new FormControl(
          teaching.classesAndGroups[0].periods[0].startTime
        )
      });
    });
  }
  setStartTime(event) {
    // console.log(event);
    this.store.dispatch(setAllStartTime({ startTime: event }));
  }
}
