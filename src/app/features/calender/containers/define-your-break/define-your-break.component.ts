import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import {
  selectTeaching,
  selectAllClasses,
  selectOrphanedClasses
} from '../../ngrx/selectors';
import {
  addBreak,
  removeBreak,
  addClassesGroup,
  reassignClass,
  setGroupTeachingDays,
  setGroupPeriods,
  setGroupStartTime,
  updateBreakData
} from '../../ngrx/actions/calendar.actions';
import { v4 as uuid44 } from 'uuid';
import { ClassModel } from 'src/app/shared/models/class.model';
import { map } from 'rxjs/operators';
import { ClassGroupModel } from '../../models/class-group.model';
import { FormGroup, FormArray } from '@angular/forms';
import { buildRangePipe, defineDays, definePeriods } from '../../utilities';
import { TeachingDay } from '../../models/teaching-day.model';

@Component({
  selector: 'edu-define-your-break',
  templateUrl: './define-your-break.component.html',
  styleUrls: ['./define-your-break.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefineYourBreakComponent implements OnInit {
  dayOptions: Observable<{ value: string; display: string }[]>;
  periodOptions: Observable<{ value: number; display: string }[]>;
  testData = {
    title: 'testTitle',
    day: ['Mon', 'Tue'],
    after: [1, 2],
    duration: 10
  };
  orphanedClasses: Observable<ClassModel[]>;
  activatedRouteData = this.activatedRoute.snapshot.data;
  teachingState: Observable<TeachingStateModel>;
  allClasses: Observable<ClassModel[]>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<CalendarStateModel>
  ) { }
  toggleActiveClass(classItem: ClassModel, classesGroup: ClassGroupModel) {
    this.store.dispatch(reassignClass({ class: classItem, classesGroup }));
  }
  isPresent(classes: ClassModel[], classItem: ClassModel) {
    for (let i = 0; i < classes.length; i++) {
      if (classes[i].id === classItem.id) {
        return true;
      }
    }
    return false;
  }
  updateBreakData(
    groupId: string,
    field: 'title' | 'day' | 'after' | 'duration',
    value: any,
    index: number
  ) {
    this.store.dispatch(updateBreakData({ groupId, index, field, value }));
  }
  updateTitle($event, idx: number, groupId: string) {
    // console.log(groupId, 'title', $event, idx);
    this.updateBreakData(groupId, 'title', $event, idx);
  }
  updateDay($event, idx: number, groupId: string) {
    this.updateBreakData(groupId, 'day', $event, idx);
  }
  updateAfter($event, idx: number, groupId: string) {
    this.updateBreakData(groupId, 'after', $event, idx);
  }
  updateDuration($event, idx: number, groupId: string) {
    console.log(groupId, 'duration', $event, idx);
    this.updateBreakData(groupId, 'duration', $event, idx);
  }
  getMinInString(val) {
    return `${val}`;
  }

  ngOnInit(): void {

    this.orphanedClasses = this.store.select(selectOrphanedClasses);
    this.teachingState = this.store.select(selectTeaching);

    this.allClasses = this.store.select(selectAllClasses).pipe(
      map(unsortedClasses => {
        const unsortedClassesCopy: ClassModel[] = JSON.parse(
          JSON.stringify(unsortedClasses)
        );
        return unsortedClassesCopy.sort(
          (itemA, itemB) => itemA.grade - itemB.grade
        );
      })
    );
    // this.dayOptions = defineDays(this.teachingState)
    // this.periodOptions = definePeriods(this.teachingState);
  }
  getDaysOptions(item: ClassGroupModel) {
    return defineDays(of(item.teachingDays))
  }
  getPeriodOptions(item: ClassGroupModel) {
    return definePeriods(of(item.periods));
  }
  timeArr = Array(60).fill('');
  dayArr = ['All', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  periodArr = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];
  popoverArr = Array(12).fill('');
  popoverState = false;
  classArr = [
    {
      break: [0]
    }
  ];

  closePopover() {
    this.popoverState = !this.popoverState;
  }
  addBreakArr(index) {
    this.store.dispatch(addBreak({ groupId: index }));
  }
  addClassArr() {
    this.classArr.push({ break: [0] });
  }
  removeBreak(groupId, idx) {
    this.store.dispatch(removeBreak({ groupId, breakIndex: idx }));
  }
  @ViewChild('scrollableEl') scrollableEl: ElementRef;
  startScroll(el) {
    if (typeof this.scrollableEl === 'undefined') {
      return true;
    }
    var vh = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    var scrollableHeight = this.scrollableEl.nativeElement.offsetHeight;
    var maxHeight = vh - 330;
    let res = scrollableHeight >= maxHeight - 10;
    return res;
  }
  addNewGroup(classItem: ClassModel) {
    const generatedGroupId = uuid44();
    this.store.dispatch(addClassesGroup({ generatedGroupId }));
    this.store.dispatch(
      reassignClass({ class: classItem, groupId: generatedGroupId })
    );
    this.store.dispatch(setGroupTeachingDays({ groupId: generatedGroupId }));
    this.store.dispatch(setGroupPeriods({ groupId: generatedGroupId }));
    this.store.dispatch(setGroupStartTime({ groupId: generatedGroupId }));
  }
  computeClasses(classes: ClassModel[]) {
    const grades = classes
      .map(classItem => classItem.grade)
      .sort((a, b) => a - b);
    const result = buildRangePipe(grades);
    return result;
  }
  parsePeriodValue(arr) {
    // console.log(arr);
    if (arr.length == 0) {
      console.log('period return');
      return '';
    }
    let displayValue = '';

    let temp = arr
      .map(number => {
        let suffix;
        if (typeof number === 'string' && number.toLowerCase() === 'all') {
          return `${number}`;
        }

        if (number == 1) {
          suffix = 'st';
        } else if (number == 2) {
          suffix = 'nd';
        } else if (number == 3) {
          suffix = 'rd';
        } else {
          suffix = 'th';
        }
        return `${number}${suffix}`;
      })
      .reduce((a, b) => `${a},${b}`);

    if (arr.length == 1 && arr[0] == '') {
      displayValue = '';
    } else {
      displayValue = `${temp} period`;
    }
    return displayValue;
  }
  test() { }
  parseDayValue(arr) {
    console.log(arr);
    let displayValue = '';
    if (arr.length == 0) {
      return '';
    }
    let temp = arr.reduce((a, b) => `${a},${b}`);
    displayValue = `${temp} period`;
    // }
    return arr.reduce((a, b) => `${a},${b}`);
  }
}
