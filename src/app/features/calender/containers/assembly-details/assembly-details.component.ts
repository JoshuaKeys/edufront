import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AsyncValidatorFn
} from '@angular/forms';
import { ClassGroupModel } from '../../models/class-group.model';
import { setAssemblyData } from '../../ngrx/actions/calendar.actions';
import { selectTeaching, getEarliestStartTime } from '../../ngrx/selectors';
import { take, map, reduce } from 'rxjs/operators';
import { PeriodModel } from '../../models/period.model';

@Component({
  selector: 'edu-assembly-details',
  templateUrl: './assembly-details.component.html',
  styleUrls: ['./assembly-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssemblyDetailsComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  teachingState: Observable<TeachingStateModel>;
  assemblyDetailsForm: FormGroup;
  timeArr = Array(60);

  durations: { duration: number; text: string }[] = [];
  updateStartTime(event, field) {
    console.log(event);
    this.updateAssemblyData(field, { duration: event, text: event });
  }

  ngOnInit(): void {
    for (let i = 0; i < this.timeArr.length; i++) {
      this.durations.push({ duration: i + 1, text: `${i + 1} mins` });
    }
    this.teachingState = this.store.select(selectTeaching);
    this.teachingState.pipe(take(1)).subscribe(teachingState => {
      // const startingAtObjIdx = this.durations.findIndex(duration => {
      //   duration.duration + '' ===
      //     (teachingState.classesAndGroups[0] as ClassGroupModel).periods[0]
      //       .assembly.startingAt;
      // });
      const assemblyDurationIdx = this.durations.findIndex(duration => [
        duration.duration + '' ===
          (teachingState.classesAndGroups[0] as ClassGroupModel).periods[0]
            .assembly.duration
      ]);
      const assembly = (teachingState.classesAndGroups[0] as ClassGroupModel)
        .periods[0].assembly;
      const assemblyName = (teachingState
        .classesAndGroups[0] as ClassGroupModel).periods[0].assembly.name;

      this.assemblyDetailsForm = new FormGroup(
        {
          assemblyName: new FormControl(assemblyName ? assemblyName : null),
          assemblyDuration: new FormControl(
            assembly.duration ? assembly.duration : null
          ),
          startingAt: new FormControl(
            assembly.startingAt ? assembly.startingAt : null
          )
          // startingAt: new FormControl(
          //   this.durations[startingAtObjIdx]
          //     ? this.durations[startingAtObjIdx]
          //     : null
          // )
        },
        null,
        this.formGroupValidator.bind(this)
      );

      this.assemblyDetailsForm.valueChanges.subscribe(assemblyForm => {
        let assemblyName = assemblyForm.assemblyName;
        assemblyName = assemblyName ? assemblyName : '';
        this.updateAssemblyData2('name', assemblyName);

        if (this.assemblyDetailsForm.errors) {
          let assemblyTimingError =
            this.assemblyDetailsForm.errors.assemblyDuration ||
            this.assemblyDetailsForm.errors.startingAt ||
            !Boolean(assemblyForm.startingAt) ||
            !Boolean(assemblyForm.assemblyDuration);
          if (assemblyTimingError) {
            // console.log('assembly timing error');
            this.updateAssemblyData2('startingAt', '');
            this.updateAssemblyData2('duration', '');
          } else {
            // console.log('no assembly timing error');
            this.updateAssemblyData2('startingAt', assemblyForm.startingAt);
            this.updateAssemblyData2('duration', assemblyForm.assemblyDuration);
          }
        } else {
          // console.log('no error');
          this.updateAssemblyData2('startingAt', assemblyForm.startingAt);
          this.updateAssemblyData2('duration', assemblyForm.assemblyDuration);
        }
        // this.cd.markForCheck();
      });
    });
  }

  get fromControl() {
    return this.assemblyDetailsForm.controls;
  }

  updateAssemblyData2(
    field: 'startingAt' | 'duration' | 'name',
    value: string
  ) {
    this.store.dispatch(setAssemblyData({ field, value }));
  }
  updateAssemblyData(
    field: 'startingAt' | 'duration' | 'name',
    value: { duration: number; text: string } | string
  ) {
    console.log(value);
    if (field !== 'name') {
      this.store.dispatch(
        setAssemblyData({
          field,
          value: (value as { duration: number; text: string }).duration
        })
      );
      return;
    }
    this.store.dispatch(
      setAssemblyData({ field: 'name', value: value as string })
    );
    console.log(this.assemblyDetailsForm.value);
  }
  updateAssemblyName($event) {
    const name = $event.target.value;
    this.updateAssemblyData('name', name);
    console.log(this.assemblyDetailsForm.value);
  }

  convertTimeToString(time) {
    let min: any = time % 100;
    min = min < 10 ? `0${min}` : `${min}`;
    let hr: any = Math.floor(time / 100);
    hr = hr < 10 ? `0${hr}` : `${hr}`;
    return `${hr}:${min}`;
  }
  addTimeInInt(...time) {
    let res = 0;
    console.log(time);
    time.forEach(_time => {
      let resH = Math.floor(res / 100) * 100;
      let resMin = res % 100;

      let currHr = Math.floor(_time / 100) * 100;
      let currMin = _time % 100;

      let newHr = resH + currHr + Math.floor((resMin + currMin) / 60) * 100;

      let newMin = (resMin + currMin) % 60;
      res = newHr + newMin;
    });
    return res;
  }
  formGroupValidator(fg: FormGroup) {
    console.log('formGroupValidator', fg);
    let startingAt = fg.controls['startingAt'].value;
    let assemblyDuration = fg.controls['assemblyDuration'].value;
    let assemblyName = fg.controls['assemblyName'].value;
    let error: { [key: string]: string | boolean } | null = {};
    console.log(startingAt, assemblyDuration, assemblyName);
    if (!startingAt) {
      error['startingAtRequired'] = true;
    }
    if (!assemblyDuration) {
      error['assemblyDurationRequired'] = true;
    }
    if (!assemblyName) {
      error['assemblyNameRequired'] = true;
    }

    return this.store.select(getEarliestStartTime).pipe(
      take(1),
      map(earliestStartTime => {
        console.log(earliestStartTime);

        if (startingAt !== null) {
          startingAt = this.convertTimeToInt(startingAt);
          console.log(
            startingAt,
            earliestStartTime,
            startingAt > earliestStartTime
          );
          if (startingAt >= earliestStartTime) {
            // this.errorMsg = `Assembly starting time should be before ${earliestStartTime}`;

            error.startingAt = `Assembly starting time should be before ${this.convertTimeToString(
              earliestStartTime
            )}`;
          }
          console.log(error);
        }

        if (startingAt !== null && assemblyDuration !== null) {
          assemblyDuration = parseInt(assemblyDuration);
          console.log(startingAt);
          startingAt = startingAt;
          console.log(
            assemblyDuration,
            startingAt,
            this.addTimeInInt(startingAt, assemblyDuration),
            startingAt + assemblyDuration > earliestStartTime
          );
          if (
            this.addTimeInInt(startingAt, assemblyDuration) > earliestStartTime
          ) {
            // this.errorMsg = `Assembly should end before ${earliestStartTime}`;
            error.assemblyDuration = `Assembly should end before ${this.convertTimeToString(
              earliestStartTime
            )}`;

            console.log(error);
            return error;
          }
        }

        error = error === {} ? null : error;
        console.log('startingat error is null here', error);
        return error;
      })
    );
  }

  convertTimeToInt(time: string): number {
    if (time.length !== 5) {
      return 1000000;
    } else {
      let h = parseInt(time.substring(0, 2)) * 100;
      let m = parseInt(time.substring(3, 5));
      return h + m;
    }
  }

  constructor(
    private store: Store<CalendarStateModel>,
    private activatedRoute: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}
}
