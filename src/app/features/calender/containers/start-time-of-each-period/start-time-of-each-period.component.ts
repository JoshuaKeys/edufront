import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { Store } from '@ngrx/store';
import { CalendarModel } from '../../models/calendar.model';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectTeaching, selectAllClasses, selectOrphanedClasses } from '../../ngrx/selectors';
import { ClassModel } from 'src/app/shared/models/class.model';
import { ClassGroupModel } from '../../models/class-group.model';
import { reassignClass, selectStartTime, addClassesGroup, addPeriodsToGroup, setStartTime, setGroupTeachingDays, setGroupPeriods, setGroupStartTime } from '../../ngrx/actions/calendar.actions';
import { SelectedPeriodModel } from '../../models/selected-period.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { v4 as uuid44} from 'uuid';
import { map } from 'rxjs/operators';
import { buildRangePipe } from '../../utilities';

@Component({
  selector: 'edu-start-time-of-each-period',
  templateUrl: './start-time-of-each-period.component.html',
  styleUrls: ['./start-time-of-each-period.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartTimeOfEachPeriodComponent implements OnInit {
  orphanedClasses: Observable<ClassModel[]>;
  constructor(private store: Store<CalendarStateModel>, private activatedRoute: ActivatedRoute) {}
  allClasses: Observable<ClassModel[]>;
  teachingData: Observable<TeachingStateModel>;
  selectTimeForm: FormGroup;
  activatedRouteData = this.activatedRoute.snapshot.data;
  hr = '07';
  min = '00';
  addNewGroup(classItem: ClassModel) {
    const generatedGroupId = uuid44();
    this.store.dispatch(addClassesGroup({generatedGroupId}))
    this.store.dispatch(reassignClass({class: classItem, groupId: generatedGroupId}))
    this.store.dispatch(setGroupTeachingDays({groupId: generatedGroupId}))
    this.store.dispatch(setGroupPeriods({groupId: generatedGroupId}))
    this.store.dispatch(setGroupStartTime({groupId: generatedGroupId}))
  } 
  toggleActiveClass(classItem: ClassModel, classesGroup: ClassGroupModel) {
    this.store.dispatch(reassignClass({class: classItem, classesGroup}))
  }
  isPresent(classes: ClassModel[], classItem: ClassModel) {
    for(let i = 0; i < classes.length; i++) {
      if(classes[i].id === classItem.id) {
        return true
      }
    }
    return false;
  }
  computeClasses(classes: ClassModel[]){
    const grades = classes.map(classItem => classItem.grade).sort((a, b)=> a -b);
    const result = buildRangePipe(grades);
    return result
  }
  ngOnInit(): void {
    this.orphanedClasses = this.store.select(selectOrphanedClasses)
    this.teachingData = this.store.select(selectTeaching);
    this.allClasses = this.store.select(selectAllClasses).pipe(
      map(unsortedClasses => {
        const unsortedClassesCopy: ClassModel[] = JSON.parse(JSON.stringify(unsortedClasses))
        return unsortedClassesCopy.sort((itemA, itemB)=> itemA.grade - itemB.grade)
      })
    )
  }
  onSubmit() {
    console.log('Hello');
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
    const generatedGroupId = uuid44();
    this.store.dispatch(addClassesGroup({generatedGroupId}))
    this.store.dispatch(addPeriodsToGroup({generatedGroupId}))
  }
  selectStartTime($event: SelectedPeriodModel) {
    this.store.dispatch(selectStartTime($event))
  }
  onHourChange(timeChange) {
    let stringRepOfHour = '';
    if(timeChange < 10) {
      stringRepOfHour = '0' + timeChange;
    }else {
      stringRepOfHour = timeChange;
    }
    const startTime = `${stringRepOfHour}:${this.min}`
    this.hr = stringRepOfHour;
    this.store.dispatch(setStartTime({startTime}))
  }
  onMinutesChange(timeChange) {
    let stringRepOfMin = '';
    if(timeChange < 10) {
      stringRepOfMin = '0' + timeChange;
    }else {
      stringRepOfMin = timeChange;
    }
    const startTime = `${this.hr}:${stringRepOfMin}`
    this.min = stringRepOfMin
    this.store.dispatch(setStartTime({startTime}))
  }
  isWeekend(index) {
    if (index > 4) {
      return 'badge--inactive';
    }
    return '';
  }
  // toggleActiveClass(classItem: ClassModel, classesGroup: ClassGroupModel) {
  //   this.store.dispatch(reassignClass({class: classItem, classesGroup}))
  // }
  display2Digit(value: number) {
    if (value < 10) {
      return `0${value}`;
    } else {
      return value;
    }
  }
}
