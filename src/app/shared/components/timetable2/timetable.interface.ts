export interface SpecialPeriod {
  startTime: string;
  endTime: string;
  text: string;

  color?: string;
  start: Day;
  end: Day;
  isBlank?: boolean;
  inFirstHalf?: boolean;
  //inFirstHalf >> this property allows you to determine if the special period is in the top or bottom block
}

export interface Period {
  key: any;
  value: any;
  startTime: string;
  endTime: string;
}
export interface TimetableModel {
  mon?: Period[];
  tue?: Period[];
  wed?: Period[];
  thu?: Period[];
  fri?: Period[];
  sat?: Period[];
  sun?: Period[];
}
export interface Time {
  value: '';
  isSingleRow?: boolean;
  hasSpecialColor?: boolean;
}

export enum Day {
  mon = 'mon',
  tue = 'tue',
  wed = 'wed',
  thu = 'thu',
  fri = 'fri',
  sat = 'sat',
  sun = 'sun'
}
