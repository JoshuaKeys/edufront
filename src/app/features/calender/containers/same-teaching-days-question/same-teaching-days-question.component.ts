import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { setDefaultTeachingDays } from '../../ngrx/actions/calendar.actions';

@Component({
  selector: 'edu-same-teaching-days-question',
  templateUrl: './same-teaching-days-question.component.html',
  styleUrls: ['./same-teaching-days-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SameTeachingDaysQuestionComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  ngOnInit(): void { }
  goToDaysDefinition() {
    this.store.dispatch(setDefaultTeachingDays())
    this.router.navigateByUrl('/calendar/teaching-day-for-class-question')

  }
  goToTeachingDays() {
    this.router.navigate(['../', this.activatedRouteData.next], {
      relativeTo: this.activatedRoute
    });
  }
  constructor(private router: Router,
    private store: Store<CalendarStateModel>,
    private activatedRoute: ActivatedRoute
  ) { }

  goToPrepopulatedHolidayList() { }
  goToHolidayList() { }
}
