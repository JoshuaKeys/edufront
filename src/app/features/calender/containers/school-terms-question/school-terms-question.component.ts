import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarModel } from '../../models/calendar.model';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectCalendar } from '../../ngrx/selectors';
import { toggleSelectedTerms, initializeTermsAndDates } from '../../ngrx/actions/calendar.actions';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edu-school-terms-question',
  templateUrl: './school-terms-question.component.html',
  styleUrls: ['./school-terms-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolTermsQuestionComponent implements OnInit {
  calendarData: Observable<CalendarModel>;
  activatedRouteData = this.activatedRoute.snapshot.data;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<CalendarStateModel>) { }

  ngOnInit(): void {
    this.calendarData = this.store.select(selectCalendar);
  }
  goNext() {
    this.router.navigate(['../', this.activatedRouteData.next], {relativeTo: this.activatedRoute});
    this.store.dispatch(initializeTermsAndDates());
  }
  onToggleActive(schoolTerms: number) {
    this.store.dispatch(toggleSelectedTerms({schoolTerms}));
  }
}
