import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectTeaching, selectAllClasses } from '../../ngrx/selectors';
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

@Component({
  selector: 'edu-define-your-break',
  templateUrl: './define-your-break.component.html',
  styleUrls: ['./define-your-break.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefineYourBreakComponent implements OnInit {
  // fix
  testData = {
    title: 'testTitle',
    day: ['Mon', 'Tue'],
    after: [1, 2],
    duration: 10
  };

  activatedRouteData = this.activatedRoute.snapshot.data;
  teachingState: Observable<TeachingStateModel>;
  allClasses: Observable<ClassModel[]>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<CalendarStateModel>
  ) {}
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
  updateBreakData(groupId: string, field: 'title'|'day'|'after'|'duration', value: any, index: number) {
    this.store.dispatch(updateBreakData({groupId,index, field, value}));
  }
  updateTitle($event, idx: number, groupId: string) {
    this.updateBreakData(groupId, 'title', $event, idx)
  }
  updateDay($event, idx: number, groupId: string) {
    this.updateBreakData(groupId,'day', $event, idx)
  }
  updateAfter($event, idx: number, groupId: string) {
    this.updateBreakData(groupId, 'after', $event, idx);
  }
  updateDuration($event, idx: number, groupId: string) {
    this.updateBreakData(groupId, 'duration', $event, idx);
  }
  ngOnInit(): void {
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
  parsePeriodValue(arr) {
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
    displayValue = `${temp} period`;
    // }
    return displayValue;
  }
  test() {}
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
  periodOption = [
    { value: 1, display: 'P1' },
    { value: 2, display: 'P2' },
    { value: 3, display: 'P3' },
    { value: 4, display: 'P4' },
    { value: 5, display: 'P5' },
    { value: 6, display: 'P6' },
    { value: 11, display: 'P11' },
    { value: 12, display: 'P12' },
    { value: 13, display: 'P13' },
    { value: 14, display: 'P14' },
    { value: 15, display: 'P15' },
    { value: 16, display: 'P16' }
  ];
  dayOptions = [
    { value: 'all', display: 'All' },
    { value: 'Mon', display: 'Mon' },
    { value: 'Tue', display: 'Tue' },
    { value: 'Wed', display: 'Wed' },
    { value: 'Thu', display: 'Thu' },
    { value: 'Fri', display: 'Fri' },
    { value: 'Sat', display: 'Sat' },
    { value: 'Sun', display: 'Sun' }
  ];
}
