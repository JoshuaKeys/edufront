import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { fetchHolidaysRequest } from '../../ngrx/actions/calendar.actions';

@Component({
  selector: 'edu-government-holidays-observed-question',
  templateUrl: './government-holidays-observed-question.component.html',
  styleUrls: ['./government-holidays-observed-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GovernmentHolidaysObservedQuestionComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;


  ngOnInit(): void {
  }
  goToPrepopulatedHolidayList() {
    this.store.dispatch(fetchHolidaysRequest());
    this.router.navigate(['../', this.activatedRouteData.next], {relativeTo: this.activatedRoute})
  }
  goToHolidayList() {
    this.router.navigate(['../', this.activatedRouteData.next], {relativeTo: this.activatedRoute})
  }
  constructor(private router: Router,
    private store: Store<CalendarStateModel>,
    private activatedRoute: ActivatedRoute) { }
}
