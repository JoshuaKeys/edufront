import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { setAllStartTime, setSamePeriodsQuestion, setSameStartTimeStatus } from '../../ngrx/actions/calendar.actions';
import { Observable } from 'rxjs';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { selectTeaching } from '../../ngrx/selectors';

@Component({
  selector: 'edu-same-periods-per-time',
  templateUrl: './same-periods-per-time.component.html',
  styleUrls: ['./same-periods-per-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SamePeriodsPerTimeComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data
  teachingData: Observable<TeachingStateModel>;
  ngOnInit(): void {
    this.teachingData = this.store.select(selectTeaching);
  }
  goToUpperNext() {
    this.setSameStartTimeStatus(false)
    this.store.dispatch(setAllStartTime({ startTime: '08:00' }))
    this.router.navigateByUrl('/calendar/start-time-of-each-period')
  }
  setSameStartTimeStatus(boolean) {
    this.store.dispatch(setSameStartTimeStatus({ value: boolean }))
  }
  constructor(
    private router: Router,
    private store: Store<CalendarStateModel>,
    private activatedRoute: ActivatedRoute) { }
}
