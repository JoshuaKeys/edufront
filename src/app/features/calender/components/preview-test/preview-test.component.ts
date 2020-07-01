import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarModel } from '../timetable-preview/calendar.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'edu-preview-test',
  templateUrl: './preview-test.component.html',
  styleUrls: ['./preview-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTestComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  data;
  modelTest = '';
  testForm: FormGroup;
  ngOnInit(): void {
    this.data = newState;
    this.testForm = this.formBuilder.group({
      f1: ['23:2']
    });
  }
}

let newState: CalendarModel[] = [
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3', 'P4'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '',
    breaks: [
      {
        name: 'break 1',
        firstBreak: '',
        day: '',
        after: 'P1',
        duration: '15'
      },
      {
        name: 'break 2',
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '90'
      }
    ],
    assembly: { name: 'assembly1', startingAt: '07:30', duration: '60' }
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '',
    breaks: [
      {
        name: 'break 2',
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '90'
      }
    ],
    assembly: { name: 'assembly1', startingAt: '07:30', duration: '60' }
  },
  // {
  //   day: 'Thu',
  //   periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
  //   startTime: '08:30',
  //   periodDuration: '30',
  //   intervaBtwPeriods: '',
  //   breaks: [
  //     {
  //       name: 'break 1',
  //       firstBreak: '',
  //       day: '',
  //       after: 'P1',
  //       duration: '90'
  //     },
  //     {
  //       name: 'break 2',
  //       firstBreak: '',
  //       day: '',
  //       after: 'P5',
  //       duration: '90'
  //     }
  //   ],
  //   assembly: { name: 'assembly1', startingAt: '07:30', duration: '60' }
  // },
  {
    day: 'Fri',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '',
    breaks: [
      {
        name: 'break 1',
        firstBreak: '',
        day: '',
        after: 'P1',
        duration: '90'
      },
      {
        name: 'break 2',
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '90'
      }
    ],
    assembly: { name: 'assembly1', startingAt: '07:30', duration: '60' }
  }
];

let testData2 = [
  {
    day: 'Mon',
    periods: ['P1', 'P2', 'P3', 'P4'],
    startTime: '',
    periodDuration: '',
    intervaBtwPeriods: '',
    breaks: [],
    assembly: {
      name: '',
      startingAt: '',
      duration: ''
    }
  },
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3'],
    startTime: '',
    periodDuration: '',
    intervaBtwPeriods: '',
    breaks: [],
    assembly: {
      name: '',
      startingAt: '',
      duration: ''
    },
    periodSelected: true
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4'],
    startTime: '',
    periodDuration: '',
    intervaBtwPeriods: '',
    breaks: [],
    assembly: {
      name: '',
      startingAt: '',
      duration: ''
    }
  },
  {
    day: 'Thu',
    periods: ['P1', 'P2', 'P3', 'P4'],
    startTime: '08:20',
    periodDuration: '',
    intervaBtwPeriods: '',
    breaks: [],
    assembly: {
      name: '',
      startingAt: '',
      duration: ''
    }
  },
  {
    day: 'Fri',
    periods: ['P1', 'P2', 'P3', 'P4'],
    startTime: '08:00',
    periodDuration: '',
    intervaBtwPeriods: '',
    breaks: [],
    assembly: {
      name: '',
      startingAt: '',
      duration: ''
    }
  },
  {
    day: 'Sat',
    periods: [],
    startTime: '',
    periodDuration: '',
    intervaBtwPeriods: '',
    breaks: [],
    assembly: {
      name: '',
      startingAt: '',
      duration: ''
    }
  },
  {
    day: 'Sun',
    periods: [],
    startTime: '',
    periodDuration: '',
    intervaBtwPeriods: '',
    breaks: [],
    assembly: {
      name: '',
      startingAt: '',
      duration: ''
    }
  }
];

let testData1 = [
  {
    day: 'Mon',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5'],
    startTime: '20:41',
    periodDuration: '',
    intervaBtwPeriods: '',
    breaks: [],
    assembly: {
      name: '',
      startingAt: '',
      duration: ''
    },
    periodSelected: true
  },
  {
    day: 'Tue',
    periods: ['P1', 'P2'],
    startTime: '20:41',
    periodDuration: '',
    intervaBtwPeriods: '',
    breaks: [],
    assembly: {
      name: '',
      startingAt: '',
      duration: ''
    }
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4'],
    startTime: '20:41',
    periodDuration: '',
    intervaBtwPeriods: '',
    breaks: [],
    assembly: {
      name: '',
      startingAt: '',
      duration: ''
    },
    periodSelected: true
  },
  {
    day: 'Thu',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
    startTime: '20:41',
    periodDuration: '',
    intervaBtwPeriods: '',
    breaks: [],
    assembly: {
      name: '',
      startingAt: '',
      duration: ''
    },
    periodSelected: true
  },
  {
    day: 'Fri',
    periods: ['P1', 'P2'],
    startTime: '20:41',
    periodDuration: '',
    intervaBtwPeriods: '',
    breaks: [],
    assembly: {
      name: '',
      startingAt: '',
      duration: ''
    }
  },
  {
    day: 'Sat',
    periods: [],
    startTime: '',
    periodDuration: '',
    intervaBtwPeriods: '',
    breaks: [],
    assembly: {
      name: '',
      startingAt: '',
      duration: ''
    }
  },
  {
    day: 'Sun',
    periods: [],
    startTime: '',
    periodDuration: '',
    intervaBtwPeriods: '',
    breaks: [],
    assembly: {
      name: '',
      startingAt: '',
      duration: ''
    }
  }
];
