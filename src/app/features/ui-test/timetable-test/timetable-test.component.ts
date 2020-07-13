import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {
  SpecialPeriod,
  Day,
  TimetableModel
} from '../../../shared/components/timetable/timetable.interface';

import { Output, EventEmitter, HostListener } from '@angular/core';
@Component({
  selector: 'edu-timetable-test',
  templateUrl: './timetable-test.component.html',
  styleUrls: ['./timetable-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeTableTestComponent implements OnInit {
  constructor(private cd: ChangeDetectorRef) {}

  cbTestFn($event) {
    console.log(`cbTestFn - ${$event}`);
  }

  ngOnInit(): void {}

  prettyPrint(obj) {
    return JSON.stringify(obj, null, 2);
    // return "123";
  }

  getEmptyArr(number) {
    if (number == null || number.len < 1) {
      return [''];
    }

    let len = parseInt(number);
    if (len === 0) {
      return [''];
    }
    return new Array(len);
  }

  testCbVal;
  checkBoxCheck(event, fn, k) {
    this.testCbVal = { key: k, value: event.currentTarget.checked };
    fn(k, event.currentTarget.checked);
  }

  time = [
    { value: '7:45', isSingleRow: true },
    { value: '8:00' },
    { value: '9:00' },
    { value: '9:45', isSingleRow: true },
    { value: '10:00' },
    { value: '11:00' },
    { value: '11:45', isSingleRow: true },
    { value: '12:00' }
  ];
  specialPeriods: SpecialPeriod[] = [
    //time has to be exactly the same as the time declared above as the main comp determines placing by matching the strings
    //color MUST be hex
    {
      time: '11:45',
      text: 'break',
      color: '#F2B269',
      start: Day.mon,
      end: Day.mon
    },
    {
      time: '9:45',
      text: 'break',
      color: '#F2B269',
      start: Day.mon,
      end: Day.sun
    },
    {
      //for empty block
      time: '8:00',
      text: '',
      start: Day.wed,
      end: Day.wed
    },
    {
      time: '7:45',
      text: 'Assembly',
      color: '#69a9f2',
      start: Day.mon,
      end: Day.sun
    },

    {
      time: '11:45',
      text: 'break',
      color: '#F2B269',
      start: Day.thu,
      end: Day.sun
    },
    {
      time: '10:00',
      text: 'break',
      color: '#F2B269',
      start: Day.wed,
      end: Day.wed,
      inFirstHalf: true
    },
    {
      time: '11:00',
      text: 'break',
      color: '#F2B269',
      start: Day.wed,
      end: Day.wed,
      inFirstHalf: false
    }
  ];
  model: TimetableModel = {
    //must be decalred from Mon to Sun, not all days are compulsory. will appear in same order as array
    //value of KEY doesnt matter but it must be unique across all days. as values are updated based on this KEY value
    // unique i.e keys used in monday cant be reused in tuesday
    //trying to use this as the ngModel object that gets ouputted, but having issues letting ng-tempalte communicated with <edu-timetable> Component
    mon: [
      { key: 'm1', value: '2' },
      { key: 'm2', value: '0' },
      { key: 'm3', value: '0' },
      { key: 'm4', value: '0' },
      { key: 'm5', value: '0' }
    ],
    tue: [
      { key: 't1', value: '0' },
      { key: 't2', value: '0' },
      { key: 't3', value: '0' },
      { key: 't4', value: '0' },
      { key: 't5', value: '0' }
    ],
    wed: [
      { key: 'w1', value: '0' },
      { key: 'w2', value: '0' },
      { key: 'w3', value: '0' },
      { key: 'w4', value: '0' },
      { key: 'w5', value: '0' }
    ],
    thu: [
      { key: 'th1', value: '0' },
      { key: 'th2', value: '0' },
      { key: 'th3', value: '0' },
      { key: 'th4', value: '0' },
      { key: 'th5', value: '0' }
    ],
    fri: [
      { key: 'f1', value: '0' },
      { key: 'f2', value: '0' },
      { key: 'f3', value: '0' },
      { key: 'f4', value: '0' },
      { key: 'f5', value: '0' }
    ],
    sat: [
      { key: 'sa1', value: '0' },
      { key: 'sa2', value: '0' },
      { key: 'sa3', value: '0' },
      { key: 'sa4', value: '0' },
      { key: 'sa5', value: '0' }
    ],
    sun: [
      { key: 'su1', value: '0' },
      { key: 'su2', value: '0' },
      { key: 'su3', value: '0' },
      { key: 'su4', value: '0' },
      { key: 'su5', value: '0' }
    ]
  };
}
