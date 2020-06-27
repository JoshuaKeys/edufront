import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { Store } from '@ngrx/store';
import { CalendarModel } from '../../models/calendar.model';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectTeaching } from '../../ngrx/selectors';
import { ClassModel } from 'src/app/shared/models/class.model';
import { ClassGroupModel } from '../../models/class-group.model';
import { reassignClass, selectStartTime } from '../../ngrx/actions/calendar.actions';
import { SelectedPeriodModel } from '../../models/selected-period.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edu-start-time-of-each-period',
  templateUrl: './start-time-of-each-period.component.html',
  styleUrls: ['./start-time-of-each-period.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartTimeOfEachPeriodComponent implements OnInit {
  constructor(private store: Store<CalendarStateModel>, private activatedRoute: ActivatedRoute) {}
  teachingData: Observable<TeachingStateModel>;
  selectTimeForm: FormGroup;
  activatedRouteData = this.activatedRoute.snapshot.data;

  ngOnInit(): void {
    this.teachingData = this.store.select(selectTeaching);
    this.selectTimeForm = new FormGroup({
      timeSelect: new FormControl('')
    })
  }

  tempArr = Array(20).fill('');
  timeArr = Array(7).fill('08:00');
  popoverArr = Array(12).fill('');
  hrSelector = Array(12).fill('');
  minSelector = Array(61).fill('');

  asObservable(item) {
    return of(item);
  }
  addToTempArr() {
    this.tempArr.push('');
  }
  onTimeChange(timeChange) {
    console.log(timeChange);
  }
  selectStartTime($event: SelectedPeriodModel) {
    this.store.dispatch(selectStartTime($event))
  }
  onMinutesChange(timeChange) {
    console.log(timeChange);
  }
  isWeekend(index) {
    if (index > 4) {
      return 'badge--inactive';
    }
    return '';
  }
  toggleActiveClass(classItem: ClassModel, classesGroup: ClassGroupModel) {
    this.store.dispatch(reassignClass({class: classItem, classesGroup}))
  }
  display2Digit(value: number) {
    if (value < 10) {
      return `0${value}`;
    } else {
      return value;
    }
  }
}
