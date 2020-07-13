import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectTeaching } from '../../ngrx/selectors';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClassGroupModel } from '../../models/class-group.model';
import { setPeriodDuration } from '../../ngrx/actions/calendar.actions';
import { map, reduce, take } from 'rxjs/operators';
@Component({
  selector: 'edu-period-duration',
  templateUrl: './period-duration.component.html',
  styleUrls: ['./period-duration.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodDurationComponent implements OnInit {
  teachingState: Observable<TeachingStateModel>;
  activatedRouteData = this.activatedRoute.snapshot.data;
  periodDurationForm: FormGroup;
  periodDurations = [
    { duration: 10, text: '10 minutes' },
    { duration: 20, text: '20 minutes' },
    { duration: 30, text: '30 minutes' },
    { duration: 40, text: '40 minutes' },
    { duration: 50, text: '50 minutes' },
    { duration: 60, text: '60 minutes' },
    { duration: 70, text: '70 minutes' }
  ];

  ngOnInit(): void {
    this.teachingState = this.store.select(selectTeaching);
    // this.periodDurationForm = new FormGroup({
    //   duration: new FormControl(this.periodDurations[1])
    // })
    this.periodDurationForm = new FormGroup({
      duration: new FormControl(null, { validators: Validators.required })
    });

    this.teachingState.pipe(take(1)).subscribe(teachingState => {
      const duration = (teachingState.classesAndGroups[0] as ClassGroupModel)
        .periods[0].periodDuration;
      const durationObjIdx = this.periodDurations.findIndex(
        _duration => _duration.duration === +duration
      );
      let _durationValue = this.periodDurations[durationObjIdx]
        ? this.periodDurations[durationObjIdx].duration
        : null;

      this.periodDurationForm.patchValue({
        duration: _durationValue
      });

      //     this.periodDurationForm.patchValue({

      //     {validators: Validators.required})
      // }
      //     })
    });
  }
  onSetPeriodDuration(duration) {
    this.store.dispatch(setPeriodDuration({ periodDuration: duration }));
  }
  constructor(
    private cd: ChangeDetectorRef,
    private store: Store<CalendarStateModel>,
    private activatedRoute: ActivatedRoute
  ) {}
}
