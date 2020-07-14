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
  updateSameBreakData,
  updateSameBreakData2
} from '../../ngrx/actions/calendar.actions';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { defineDays, definePeriods } from '../../utilities';
import { ClassGroupModel } from '../../models/class-group.model';
import { BreakModel2 } from '../../models/break.model';

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
  ) {}
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
    this.teachingData = this.store.select(selectTeaching).pipe(
      tap(teaching => {
        if (teaching.periods[0]) {
          this.getBreakArr(teaching.periods[0].breaks);
        }
        // getBreakArr
      })
    );
  }
  getDaysOptions(item: TeachingStateModel) {
    return defineDays(of(item.teachingDays));
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
    // this.updateBreakData('after', 'P' + $event, idx);
    this.updateBreakData('after', $event, idx);
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
        console.log(number, number === '2');
        number = `${number}`.replace('P', '');
        if (number === 1 || number === '1') {
          suffix = 'st';
        } else if (number === 2 || number === '2') {
          suffix = 'nd';
        } else if (number === 3 || number === '3') {
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

  //edits

  // tempBreak = {
  //   name: 'Break 01',
  //   firstBreak: '',
  //   day: [],
  //   after: '',
  //   duration: '',
  //   dayOptions: []
  // };
  tempBreakArr = [];
  getBreakArr(breakArrFromStore) {
    console.log(breakArrFromStore);
    if (breakArrFromStore.length === 0) {
      let tempBreak = {
        name: 'Break 01',
        firstBreak: '',
        day: [],
        after: '',
        duration: '',
        dayOptions: []
      };
      this.tempBreakArr.push(tempBreak);
    } else {
      this.tempBreakArr = [];
      console.log('BREAK FRO MSTORE', breakArrFromStore);
      breakArrFromStore.forEach(_break => {
        let tempBreak = JSON.parse(JSON.stringify(_break));
        let dayOptions = [];
        tempBreak = { ...tempBreak, dayOptions };
        this.tempBreakArr = [...this.tempBreakArr, tempBreak];
      });

      this.tempBreakArr = this.combineTempBreaks(this.tempBreakArr);
    }

    console.log(this.tempBreakArr);
  }

  combineTempBreaks(breakArrFromStore) {
    // let identifierArr = [] ;
    let results = [];
    let getIdentifier = _break =>
      `${_break.after}-${_break.duration}-${_break.name}`;
    //     breakArrFromStore.forEach((_break)=>{
    //       let newIdentifier = getIdentifier(_break);
    //       if(identifierArr.indexOf(newIdentifier) !== -1){
    //         identifierArr.push(newIdentifier);
    //       }

    //     })
    // console.log(identifierArr);
    breakArrFromStore.forEach(_break => {
      let identifier = getIdentifier(_break);
      let resultsIdentifierArr = results.map(res => getIdentifier(res));

      if (resultsIdentifierArr.indexOf(identifier) !== -1) {
        let indexInResults = resultsIdentifierArr.indexOf(identifier);
        let existingResults = results[indexInResults];
        let newBreak = {
          ...existingResults,
          ...{ day: [...existingResults.day, _break.day] }
        };

        results[indexInResults] = newBreak;
      } else {
        let newBreak = { ..._break, ...{ day: [_break.day] } };
        results = [...results, newBreak];
      }

      console.log(results);
    });
    console.log('FINAL ', results);
    return results;
  }

  updateTitle2(title, index) {
    console.log(this.tempBreakArr);
    this.tempBreakArr[index].name = title;
    console.log(this.tempBreakArr);
    this.parseBreakObj();
  }
  updateDay2(day, dayOptions, index) {
    console.log(this.tempBreakArr, dayOptions);
    this.tempBreakArr[index].day = day;
    this.tempBreakArr[index].dayOptions = dayOptions;
    console.log(this.tempBreakArr);
    this.parseBreakObj();
  }
  updateAfter2(after, index) {
    console.log(this.tempBreakArr);
    this.tempBreakArr[index].after = after;
    console.log(this.tempBreakArr);
    this.parseBreakObj();
  }
  updateDuration2(duration, index) {
    console.log(this.tempBreakArr);
    this.tempBreakArr[index].duration = duration;
    console.log(this.tempBreakArr);
    this.parseBreakObj();
  }

  addNewBreak() {
    let tempBreak = {
      name: 'Break 01',
      firstBreak: '',
      day: [],
      after: '',
      duration: '',
      dayOptions: []
    };
    this.tempBreakArr.push(tempBreak);
  }
  parseBreakObj() {
    let breaks: BreakModel2[] = [];
    this.tempBreakArr.forEach(tempBreak => {
      let isValidBreakObj =
        tempBreak.duration &&
        tempBreak.day &&
        tempBreak.after &&
        tempBreak.name;

      if (isValidBreakObj) {
        let days = tempBreak.dayOptions
          .map(day => day.value)
          .filter(dayValue => {
            console.log(dayValue, tempBreak.day);
            if (tempBreak.day[0] === 'All') {
              return dayValue !== 'All';
            } else {
              return tempBreak.day.map(day => day).indexOf(dayValue) !== -1;
            }
          });

        console.log(days);
        days.forEach(day => {
          let breakData = {
            name: tempBreak.name,
            firstBreak: '',
            day,
            after: tempBreak.after,
            duration: tempBreak.duration
          };
          breaks.push(breakData);
        });

        //ned to push to store later
        this.store.dispatch(updateSameBreakData2({ break: breaks }));
        console.log(breaks);
      }
    });
  }

  popoverToggleVar = false;
}
