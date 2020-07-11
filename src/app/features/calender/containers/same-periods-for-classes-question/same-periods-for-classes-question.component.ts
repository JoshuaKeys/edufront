import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { assignPeriodsToTeachingDates, setNumberOfPeriods, setSamePeriodsQuestion } from '../../ngrx/actions/calendar.actions';
import { Observable } from 'rxjs';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { selectTeaching } from '../../ngrx/selectors';

@Component({
  selector: 'edu-same-periods-for-classes-question',
  templateUrl: './same-periods-for-classes-question.component.html',
  styleUrls: ['./same-periods-for-classes-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SamePeriodsForClassesQuestionComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  teachingData: Observable<TeachingStateModel>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<CalendarStateModel>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.teachingData = this.store.select(selectTeaching);
  }
  assignDefaultPeriods() {
    this.store.dispatch(setNumberOfPeriods({ numberOfPeriods: 8 }))
    this.store.dispatch(assignPeriodsToTeachingDates({ numberOfPeriods: 8 }))
    this.answerPeriodsQuestion(false);
    this.router.navigateByUrl('/calendar/teaching-periods-per-day', { relativeTo: this.activatedRoute })
  }
  goNext() {

  }
  answerPeriodsQuestion(boolean) {
    this.store.dispatch(setSamePeriodsQuestion({ answer: boolean }));
  }
}
