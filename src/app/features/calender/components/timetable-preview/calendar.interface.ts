export interface CalendarModel {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  periods: Array<
    'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P5' | 'P6' | 'P7' | 'P8' | 'P9'
  >;
  startTime: string;
  periodDuration: string;
  intervaBtwPeriods: string;

  breaks: {
    // name:string,
    firstBreak: string;
    day: string;
    after: 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P5' | 'P6' | 'P7' | 'P8' | 'P9';
    duration: string;
  }[];
  assembly: {
    name: string;
    startingAt: string;
    duration: string;
  };
}
