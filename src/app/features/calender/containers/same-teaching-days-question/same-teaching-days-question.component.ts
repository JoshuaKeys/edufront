import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { setDefaultTeachingDays, setTeachingDaysStatus } from '../../ngrx/actions/calendar.actions';
import { Observable } from 'rxjs';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { selectTeaching } from '../../ngrx/selectors';

@Component({
  selector: 'edu-same-teaching-days-question',
  templateUrl: './same-teaching-days-question.component.html',
  styleUrls: ['./same-teaching-days-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SameTeachingDaysQuestionComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  teachingData: Observable<TeachingStateModel>;
  ngOnInit(): void {
    this.teachingData = this.store.select(selectTeaching);
  }
  goToDaysDefinition() {
    this.store.dispatch(setTeachingDaysStatus({ value: false }));
    this.store.dispatch(setDefaultTeachingDays())
    this.router.navigateByUrl('/calendar/teaching-day-for-class-question')

  }
  goToTeachingDays() {
    this.store.dispatch(setTeachingDaysStatus({ value: true }))
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
