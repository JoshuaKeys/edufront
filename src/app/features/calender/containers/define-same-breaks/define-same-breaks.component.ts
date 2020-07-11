import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from '@angular/core';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { Observable, of } from 'rxjs';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { selectTeaching } from '../../ngrx/selectors';
import {
  addSameBreak,
  updateSameBreakData
} from '../../ngrx/actions/calendar.actions';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { defineDays, definePeriods } from '../../utilities';
import { ClassGroupModel } from '../../models/class-group.model';

@Component({
  selector: 'edu-define-same-breaks',
  templateUrl: './define-same-breaks.component.html',
  styleUrls: ['./define-same-breaks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefineSameBreaksComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  teachingData: Observable<TeachingStateModel>;
  dayOptions: Observable<{ value: string; display: string }[]>;
  periodOptions: Observable<{ value: number; display: string }[]>;
  constructor(
    private store: Store<CalendarStateModel>,
    private activatedRoute: ActivatedRoute
  ) { }
  testDataArr = [
    {
      title: 'testTitle',
      day: ['Mon', 'Tue'],
      after: [1, 2],
      duration: 10
    },
    {
      title: 'testTitle1',
      day: ['all'],
      after: [1],
      duration: 30
    }
  ];

  ngOnInit(): void {
    this.teachingData = this.store.select(selectTeaching);

  }
  getDaysOptions(item: TeachingStateModel) {
    return defineDays(of(item.teachingDays))
  }
  getPeriodOptions(item: TeachingStateModel) {
    return definePeriods(of(item.periods));
  }
  timeArr = Array(60).fill('');
  formArr = [0];

  getMinInString(val) {
    return `${val}`;
  }

  addformArr() {
    this.formArr.push(0);
  }
  addSameBreaks() {
    this.store.dispatch(addSameBreak());
  }
  updateBreakData(
    field: 'name' | 'day' | 'after' | 'duration',
    value: any,
    index: number
  ) {
    this.store.dispatch(updateSameBreakData({ index, field, value }));
  }
  updateTitle($event, idx: number) {
    this.updateBreakData('name', $event, idx);
  }
  updateDay($event, idx: number) {
    this.updateBreakData('day', $event, idx);
  }
  computeName(name: string, idx: number) {
    return `name-${idx}`;
  }
  updateAfter($event, idx: number) {
    this.updateBreakData('after', 'P' + $event, idx);
  }
  updateDuration($event, idx: number) {
    this.updateBreakData('duration', $event, idx);
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
    // console.log(
    //   'maxHeight - ' + maxHeight + ',scrollable - ' + scrollableHeight
    // );
    let res = scrollableHeight >= maxHeight - 10;
    // console.log(res);
    return res;
  }

  parsePeriodValue(arr) {
    console.log(arr);
    if (arr.length == 0) {
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
        number = `${number}`.replace('P', '');
        return `${number}${suffix}`;
      })
      .reduce((a, b) => `${a},${b}`);
    if (arr.length == 1 && arr[0] == '') {
      displayValue = '';
    } else {
      displayValue = `${temp} period`;
    }
    // displayValue = `${temp} period`;
    // }
    return displayValue;
  }
  test(data) {
    console.log(data);
  }
  parseDayValue(arr) {
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
    { value: 6, display: 'P6' }
  ];
}
