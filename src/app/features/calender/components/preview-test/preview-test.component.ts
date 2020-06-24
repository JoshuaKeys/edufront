import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarModel } from '../timetable-preview/calendar.interface';
@Component({
  selector: 'edu-preview-test',
  templateUrl: './preview-test.component.html',
  styleUrls: ['./preview-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTestComponent implements OnInit {
  constructor() {}
  data;
  ngOnInit(): void {
    this.data = newState;
  }
  activeindex = 0;
  resetComponent() {
    this.activeindex = (this.activeindex + 1) % 6;
    switch (this.activeindex) {
      case 0:
        console.log('testdata5');
        this.data = testData5;
        break;
      case 1:
        this.data = testData;
        break;
      case 2:
        this.data = testData2;
        break;
      case 3:
        this.data = testData3;
        break;
      case 4:
        this.data = testData4;
        break;
      case 5:
        this.data = newState;
        break;
    }
  }
}

let testData: CalendarModel[] = [
  {
    day: 'Mon',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    startTime: '09:30',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '10:00',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Thu',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Fri',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  ,
  {
    day: 'Sat',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  }
];

let testData2: CalendarModel[] = [
  {
    day: 'Mon',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Thu',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Fri',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  ,
  {
    day: 'Sat',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  }
];
let testData3: CalendarModel[] = [
  {
    day: 'Mon',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Thu',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Fri',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  ,
  {
    day: 'Sat',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  }
];

let testData4: CalendarModel[] = [
  {
    day: 'Mon',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '09:30',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '09:00',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Thu',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '09:30',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Fri',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  ,
  {
    day: 'Sat',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  }
];

let testData5: CalendarModel[] = [
  {
    day: 'Mon',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Thu',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Fri',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  ,
  {
    day: 'Sat',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '',
    periodDuration: '0',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  }
];

let newState: CalendarModel[] = [
  {
    day: 'Mon',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '08:30',
    breaks: [
      {
        firstBreak: '',
        day: '',
        after: 'P1',
        duration: '45'
      },
      {
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '30'
      }
    ],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '08:30',
    breaks: [
      {
        firstBreak: '',
        day: '',
        after: 'P1',
        duration: '45'
      },
      {
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '45'
      }
    ],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '08:30',
    breaks: [
      {
        firstBreak: '',
        day: '',
        after: 'P1',
        duration: '45'
      },
      {
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '45'
      }
    ],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Thu',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '08:30',
    breaks: [
      {
        firstBreak: '',
        day: '',
        after: 'P1',
        duration: '45'
      },
      {
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '45'
      }
    ],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Fri',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '08:30',
    breaks: [
      {
        firstBreak: '',
        day: '',
        after: 'P1',
        duration: '45'
      },
      {
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '45'
      }
    ],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  }
];
