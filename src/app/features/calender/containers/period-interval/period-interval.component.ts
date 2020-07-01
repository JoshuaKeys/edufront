import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectTeaching } from '../../ngrx/selectors';
import { ClassGroupModel } from '../../models/class-group.model';
import { setPeriodInterval } from '../../ngrx/actions/calendar.actions';

@Component({
  selector: 'edu-period-interval',
  templateUrl: './period-interval.component.html',
  styleUrls: ['./period-interval.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodIntervalComponent implements OnInit {
  timeArr = Array(60);
  intervals: { duration: number; text: string }[] = [];
  periodIntervalForm: FormGroup;
  teachingState: Observable<TeachingStateModel>;
  activatedRouteData = this.activatedRoute.snapshot.data;

  updateInterval(interval: { duration: number; text: string }) {
    this.store.dispatch(
      setPeriodInterval({ periodInterval: interval.duration })
    );
  }
  ngOnInit(): void {
    for (let i = 0; i < this.timeArr.length; i++) {
      this.intervals.push({ duration: i + 1, text: `${i + 1} mins` });
    }
    this.teachingState = this.store.select(selectTeaching);
    this.teachingState.subscribe(teachingState => {
      const _intervalObjIdx = this.intervals.findIndex(
        interval =>
          interval.duration + '' ===
          (teachingState.classesAndGroups[0] as ClassGroupModel).periods[0]
            .intervaBtwPeriods
      );
      this.periodIntervalForm = new FormGroup({
        interval: new FormControl(
          this.intervals[_intervalObjIdx]
            ? this.intervals[_intervalObjIdx]
            : null,
          { validators: Validators.required }
        )
      });
    });
  }
  constructor(
    private store: Store<CalendarStateModel>,
    private activatedRoute: ActivatedRoute
  ) {}
}
