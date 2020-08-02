import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  ChangeDetectorRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';
import { datepickerViewTypes, DatepickerDayView } from '../datepicker.model';

@Component({
  selector: 'edu-base-datepicker',
  templateUrl: './base-datepicker.component.html',
  styleUrls: ['./base-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => BaseDatepickerComponent)
    }
  ]
})
export class BaseDatepickerComponent implements OnInit, ControlValueAccessor {
  constructor(public cd: ChangeDetectorRef) {}

  ngOnInit(): void {}
  @Output('edu-change') onEduChange = new EventEmitter();
  days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  /**
   * selectedDay is the activeSelection on the datepicker and migth not necessary be the same as this.value
   * viewValue refers to the current day that is being navigated to
   */

  selectedDate: moment.Moment;
  viewValue: moment.Moment;
  viewType: datepickerViewTypes = datepickerViewTypes.day;
  initialWriteHasPassed = false;
  yearViewData = new Array(18).fill('');
  dayViewData: DatepickerDayView = {
    previousMonth: [],
    currentMonth: [],
    nextMonth: []
  };

  resetActiveDayView() {}

  setActiveDayView() {
    //always renders 6 rows, which translates to 42days

    let currentMonth = this.viewValue.clone().startOf('month');
    let previousMonth = this.viewValue
      .clone()
      .subtract(1, 'months')
      .endOf('month');
    let nextMonth = this.viewValue
      .clone()
      .add(1, 'M')
      .startOf('month');

    let daysInPreviousMonth = (currentMonth.startOf('month').day() + 6) % 7;
    daysInPreviousMonth = daysInPreviousMonth == 0 ? 7 : daysInPreviousMonth;
    this.dayViewData.previousMonth = new Array(daysInPreviousMonth).fill('');

    this.dayViewData.nextMonth = new Array(
      42 - currentMonth.daysInMonth() - this.dayViewData.previousMonth.length
    ).fill('');
    this.dayViewData.currentMonth = new Array(currentMonth.daysInMonth()).fill(
      ''
    );

    this.dayViewData.previousMonth = this.dayViewData.previousMonth.map(
      param => {
        let val = previousMonth.format('YYYYMMDD');
        previousMonth.subtract(1, 'days');
        return val;
      }
    );
    this.dayViewData.previousMonth.reverse();

    this.dayViewData.currentMonth = this.dayViewData.currentMonth.map(val => {
      let param = currentMonth.format('YYYYMMDD');
      currentMonth.add(1, 'days');
      return param;
    });

    this.dayViewData.nextMonth = this.dayViewData.nextMonth.map(val => {
      let param = nextMonth.format('YYYYMMDD');
      nextMonth.add(1, 'days');
      return param;
    });
  }

  editViewValue(type: 'add' | 'subtract') {
    //should change to leftclick right click TODO

    if (this.isDayView) {
      let isoDateOfCurrentMonth = this.dayViewData.currentMonth[0];

      if (type === 'add') {
        this.viewValue = moment(isoDateOfCurrentMonth).add(1, 'M');
        // console.log('editViewValue add -', this.viewValue.format('MM'));
      } else {
        this.viewValue = moment(isoDateOfCurrentMonth).subtract(1, 'M');
      }
      this.setActiveDayView();
    } else if (this.isYearView) {
      let startingYear =
        type === 'add' ? this.yearViewData[17] + 1 : this.yearViewData[0] - 18;
      this.setViewYears(startingYear);
    }
    // else if (this.isMonthView) {
    //   this.viewValue[type](1, 'y');
    // }
  }

  onDayClick(isoDay) {
    // this.viewValue = moment(isoDay);
    this.value = isoDay;
    // this.selectedDate = moment(isoDay);
    this.onChange(this.value);
    this.onEduChange.emit(this.value);
    this.cd.markForCheck();
    // console.log(
    //   moment(isoDay).format('YYYY-MM-DD'),
    //   this.viewValue,
    //   this.value
    // );
  }

  setMonth(month: string) {
    // console.log(month);
    this.viewValue.month(month);

    // console.log(this.viewValue.month());
    this.setActiveDayView();
    this.displayDayView();
  }
  setYear(year: number) {
    this.viewValue.year(year);
    this.setActiveDayView();
    this.displayDayView();
  }

  setViewYears(startingYear: number) {
    this.yearViewData = this.yearViewData.map(() => {
      let _sy = startingYear;
      startingYear++;
      return _sy;
    });
  }

  toggleMonthView() {
    if (this.viewType === datepickerViewTypes.month) {
      this.viewType = datepickerViewTypes.day;
    } else {
      this.viewType = datepickerViewTypes.month;
    }
  }
  displayYearView() {
    this.viewType = datepickerViewTypes.year;
    let startingYear = this.viewValue.year() - 7;
    this.setViewYears(startingYear);
  }
  displayDayView() {
    this.viewType = datepickerViewTypes.day;
  }

  isSelectedDay(day) {
    // return moment(this.value).isSame(day);
    return this.selectedDate.isSame(day);
  }
  isSelectedMonth(monthIndex: number) {
    return this.viewValue.month() === monthIndex;
  }

  isSelectedYear(year: number) {
    return this.viewValue.year() === year;
  }

  get isDayView() {
    return this.viewType === datepickerViewTypes.day;
  }
  get isMonthView() {
    return this.viewType === datepickerViewTypes.month;
  }
  get isYearView() {
    return this.viewType === datepickerViewTypes.year;
  }
  get activeViewMonth() {
    if (!this.viewValue) {
      return '';
    }
    // console.log('editViewValue ', this.viewValue.format('YYYY-MM'));
    // return this.months[this.viewValue.month()];
    return this.months[moment(this.dayViewData.currentMonth[0]).month()];
  }
  get activeViewYear() {
    if (!this.viewValue) {
      return '';
    }

    // return this.viewValue.year();
    return moment(this.dayViewData.currentMonth[0]).year();
  }

  _value = '';
  set value(param: string) {
    this._value = param;
    let paramIsValid = moment(param).isValid();
    let isoParam = paramIsValid ? moment(param).format('YYYYMMDD') : '';
    let isInViewData = false;

    Object.keys(this.dayViewData).forEach(key => {
      if (!isInViewData) {
        isInViewData = this.dayViewData[key].indexOf(isoParam) !== -1;
      }
    });

    if (paramIsValid) {
      //value resetted
      // this.dayNotSelected = false;
      this.viewValue = moment(param);
      this.selectedDate = this.viewValue.clone();
    } else {
      // this.dayNotSelected = true;
      this.viewValue = moment();
      this.selectedDate = moment();
    }

    if (!isInViewData) {
      this.setActiveDayView();
    }
    this.cd.markForCheck();
  }
  get value() {
    return this._value;
  }
  disabled;
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any) {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
