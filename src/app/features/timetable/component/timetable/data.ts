let newState: CalendarModel[] = [
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3', 'P4'],
    startTime: '08:45',
    periodDuration: '30',
    intervaBtwPeriods: '10',
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
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '10',
    breaks: [
      {
        name: 'break 2 ',
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '90'
      }
    ],
    assembly: { name: 'assembly1', startingAt: '07:30', duration: '60' }
  },
  {
    day: 'Thu',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '10',
    breaks: [
      {
        name: 'break 1123 ',
        firstBreak: '',
        day: '',
        after: 'P1',
        duration: '90'
      },
      {
        name: 'break 2 ',
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '90'
      }
    ],
    assembly: { name: 'assembly1', startingAt: '07:30', duration: '60' }
  },
  {
    day: 'Fri',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '10',
    breaks: [
      {
        name: 'break 1 ',
        firstBreak: '',
        day: '',
        after: 'P1',
        duration: '90'
      },
      {
        name: 'break 2 ',
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '90'
      }
    ],
    assembly: { name: 'assembly1', startingAt: '07:30', duration: '60' }
  }
];
let testData: CalendarModel[] = [
  {
    day: 'Mon',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    startTime: '09:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Thu',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Fri',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  ,
  {
    day: 'Sat',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
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
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Thu',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Fri',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  ,
  {
    day: 'Sat',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '0',
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
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Thu',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  {
    day: 'Fri',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '07:30', duration: '' }
  },
  ,
  {
    day: 'Sat',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
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
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '09:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '09:00',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Thu',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '09:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Fri',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  ,
  {
    day: 'Sat',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
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
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Thu',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Fri',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  ,
  {
    day: 'Sat',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  }
];

interface blankPeriod {
  startTime: string;
  blankPeriod: number;
  startTimeInt: number;
}

interface tempSpecialPeriodModel {
  startTime: string;
  endTime: string;
  text: string;
  day: string;
  color: string;
}

interface AssemblyModel {
  name: string;
  startingAt: string;
  duration: string;
}
interface BreakModel {
  name: string;
  firstBreak: string;
  day: string;
  after: string;
  duration: string;
}

interface CalendarModel {
  day: string;
  periods: Array<string>;
  startTime: string;
  periodDuration: string;
  intervaBtwPeriods: string;

  breaks: {
    name: string;
    firstBreak: string;
    day: string;
    after: string;
    duration: string;
  }[];
  assembly: {
    name: string;
    startingAt: string;
    duration: string;
  };
}

export {
  testData,
  testData2,
  testData3,
  testData4,
  testData5,
  newState,
  CalendarModel,
  blankPeriod,
  tempSpecialPeriodModel,
  AssemblyModel,
  BreakModel
};
