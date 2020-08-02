export enum datepickerViewTypes {
  day,
  month,
  year
}

export enum datepickerOptions {
  single,
  range
}

export interface DatepickerDayView {
  currentMonth: string[];
  previousMonth: string[];
  nextMonth: string[];
  //number to be in ISO dayFormat
}

export interface DatepickerOptions {
  isRange?: boolean;
  showBorder?: boolean;
  inline?: boolean;
  displayFormat?: string;
}

export const defaultDatepickerOptions: DatepickerOptions = {
  isRange: false,
  showBorder: true,
  inline: false,
  displayFormat: 'DD/MM/YY'
};
