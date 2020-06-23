import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { TeachingDay } from '../../models/teaching-day.model';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectTeachingDays } from '../../ngrx/selectors';
import { toggleSelectedDay } from '../../ngrx/actions/calendar.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edu-teaching-days',
  templateUrl: './teaching-days.component.html',
  styleUrls: ['./teaching-days.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeachingDaysComponent implements OnInit {
  teachingDays: Observable<TeachingDay[]>;
  activatedRouteData = this.activatedRoute.snapshot.data;
  constructor(
    private store: Store<CalendarStateModel>,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.teachingDays = this.store.select(selectTeachingDays);
  }
  goNext(){

  }
  toggleActive(day: TeachingDay) {
    this.store.dispatch(toggleSelectedDay({day}))
  }
}
