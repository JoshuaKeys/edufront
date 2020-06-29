import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { initializeSameBreaks, initializeBreaks } from '../../ngrx/actions/calendar.actions';

@Component({
  selector: 'edu-break-schedule-question',
  templateUrl: './break-schedule-question.component.html',
  styleUrls: ['./break-schedule-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreakScheduleQuestionComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  ngOnInit(): void {
  }
  goNext() {
    this.store.dispatch(initializeBreaks())
    this.router.navigate(['../', this.activatedRouteData.next], {relativeTo: this.activatedRoute})
  }
  goToSameBreaks() {
    this.store.dispatch(initializeSameBreaks())
    this.router.navigateByUrl('/calendar/same-break-definition')
  }
  constructor(
    private store: Store<CalendarStateModel>,
    private router: Router,private activatedRoute: ActivatedRoute) { }
}
