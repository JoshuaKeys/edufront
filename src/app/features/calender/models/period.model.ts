export interface PeriodModel {
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  periods: Array<
    'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7' | 'P8' | 'P9' | 'P10'
  >;
  startTime: string;
  periodDuration: string;
  intervaBtwPeriods: string;
  breaks: string[];
  assembly: { name: string; startingAt: string; duration: string };
  periodSelected?: boolean;
}
