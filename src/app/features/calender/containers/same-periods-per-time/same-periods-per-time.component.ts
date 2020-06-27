import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { setAllStartTime } from '../../ngrx/actions/calendar.actions';

@Component({
  selector: 'edu-same-periods-per-time',
  templateUrl: './same-periods-per-time.component.html',
  styleUrls: ['./same-periods-per-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SamePeriodsPerTimeComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data
  ngOnInit(): void {
  }
  goToUpperNext() {
    this.store.dispatch(setAllStartTime({startTime: '08:00'}))
    this.router.navigateByUrl('/calendar/start-time-of-each-period')
  }
  constructor(
    private router: Router,
    private store: Store<CalendarStateModel>,
    private activatedRoute: ActivatedRoute) { }
}
