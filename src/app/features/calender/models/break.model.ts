export interface BreakModel {
  name: string;
  firstBreak: string;
  day: Array<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'>;
  after: number;
  duration: string;
};
export interface BreakModel2 {
  name: string;
  firstBreak: string;
  day: Array<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'>;
  after: 'P1' | 'P2' | 'P3' | 'P4' | 'P5' | 'P6' | 'P7' | 'P8';
  duration: string;
};
