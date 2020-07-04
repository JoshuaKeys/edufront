import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { assignPeriodsToTeachingDates, setNumberOfPeriods } from '../../ngrx/actions/calendar.actions';

@Component({
  selector: 'edu-same-periods-for-classes-question',
  templateUrl: './same-periods-for-classes-question.component.html',
  styleUrls: ['./same-periods-for-classes-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SamePeriodsForClassesQuestionComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<CalendarStateModel>,
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  assignDefaultPeriods() {
    this.store.dispatch(setNumberOfPeriods({numberOfPeriods: 8}))
    this.store.dispatch(assignPeriodsToTeachingDates({numberOfPeriods: 8}))
    this.router.navigateByUrl('/calendar/teaching-periods-per-day', {relativeTo: this.activatedRoute})
  }
  goNext() {

  }
  
}
