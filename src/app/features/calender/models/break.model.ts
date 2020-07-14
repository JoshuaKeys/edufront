export interface BreakModel {
  name: string;
  firstBreak: string;
  day: Array<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'>;
  after: number;
  duration: string;
}
export interface BreakModel2 {
  name: string;
  firstBreak: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun' | '';
  after: string | null;
  duration: string;
}
