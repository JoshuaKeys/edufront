import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { fetchHolidaysRequest, setGovernmentHolidaysStatus, clearAllHolidays } from '../../ngrx/actions/calendar.actions';
import { Observable } from 'rxjs';
// import { CalendarModel } from 'src/app/features/ui-test/timetable-test-2/data';
import { selectCalendar, selectTeaching } from '../../ngrx/selectors';
import { CalendarModel } from '../../models/calendar.model';
import { TeachingStateModel } from '../../models/teaching-state.model';

@Component({
  selector: 'edu-government-holidays-observed-question',
  templateUrl: './government-holidays-observed-question.component.html',
  styleUrls: ['./government-holidays-observed-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GovernmentHolidaysObservedQuestionComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  calendarData: Observable<CalendarModel>;
  ngOnInit(): void {
    this.calendarData = this.store.select(selectCalendar);
  }
  goToPrepopulatedHolidayList() {
    this.store.dispatch(setGovernmentHolidaysStatus({ value: true }))
    this.store.dispatch(fetchHolidaysRequest());
    this.router.navigate(['../', this.activatedRouteData.next], { relativeTo: this.activatedRoute });
  }
  goToHolidayList() {
    this.store.dispatch(clearAllHolidays())
    this.store.dispatch(setGovernmentHolidaysStatus({ value: false }))
    this.router.navigate(['../', this.activatedRouteData.next], { relativeTo: this.activatedRoute });
  }
  constructor(private router: Router,
    private store: Store<CalendarStateModel>,
    private activatedRoute: ActivatedRoute) { }
}
