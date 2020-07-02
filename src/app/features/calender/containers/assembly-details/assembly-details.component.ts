import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClassGroupModel } from '../../models/class-group.model';
import { setAssemblyData } from '../../ngrx/actions/calendar.actions';
import { selectTeaching } from '../../ngrx/selectors';
import { take } from 'rxjs/operators';

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
  durations: {duration: number; text: string}[] = []
  updateStartTime(event, field) {
    console.log(event);
    this.updateAssemblyData(field, {duration: event, text: event});
  }
  ngOnInit(): void {
    for(let i = 0; i < this.timeArr.length; i++) {
      this.durations.push({duration: i + 1, text: `${i + 1} mins`})
    }
    this.teachingState = this.store.select(selectTeaching);
    this.teachingState.pipe(
      take(1)
    ).subscribe(teachingState=> {
      const startingAtObjIdx = this.durations.findIndex(duration=> {
        duration.duration+'' === (teachingState.classesAndGroups[0] as ClassGroupModel).periods[0].assembly.startingAt
      });
      const assemblyDurationIdx = this.durations.findIndex(duration=> [
        duration.duration+'' === (teachingState.classesAndGroups[0] as ClassGroupModel).periods[0].assembly.duration
      ]);
      const assemblyName = (teachingState.classesAndGroups[0] as ClassGroupModel).periods[0].assembly.name;

      this.assemblyDetailsForm = new FormGroup({
        assemblyName: new FormControl(assemblyName? assemblyName : null, {validators: Validators.required}),
        assemblyDuration: new FormControl(this.durations[assemblyDurationIdx]? this.durations[assemblyDurationIdx]: null,
          {validators: Validators.required}),
        startingAt: new FormControl(this.durations[startingAtObjIdx] ? this.durations[startingAtObjIdx]: null, {
          validators: Validators.required
        })
      })
    })
  }
  updateAssemblyData(field: 'startingAt'|'duration'|'name', value: {duration: number; text: string} | string) {
    console.log(value);
    if(field !== 'name') {
      this.store.dispatch(setAssemblyData({field, value: (value as {duration: number; text: string}).duration}))
      return;
    }
    this.store.dispatch(setAssemblyData({field: 'name', value: (value as string)}))
    console.log(this.assemblyDetailsForm.value)
  }
  updateAssemblyName($event) {
    const name = $event.target.value;
    this.updateAssemblyData('name', name);
    console.log(this.assemblyDetailsForm.value)
  }
  constructor(
    private store: Store<CalendarStateModel>,
    private activatedRoute: ActivatedRoute) { }
}
