import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  ChangeDetectorRef,
  Input,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { RangeDatepickerComponent } from './range-datepicker/range-datepicker.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';
import {
  DatepickerOptions,
  defaultDatepickerOptions
} from './datepicker.model';
@Component({
  selector: 'edu-datepicker3',
  templateUrl: './datepicker3.component.html',
  styleUrls: ['./datepicker3.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => Datepicker3Component)
    }
  ]
})
export class Datepicker3Component implements OnInit, ControlValueAccessor {
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}
  popoverState = false;
  popoverIsOpen = false;
  _configOptions: DatepickerOptions = defaultDatepickerOptions;
  @Output('edu-change') onEduChange = new EventEmitter();
  @ViewChild('startDp') startDp: RangeDatepickerComponent;
  @Input('options') set configOptions(userParam) {
    this._configOptions = { ...defaultDatepickerOptions, ...userParam };
    this.cd.markForCheck();
    // console.log(this._configOptions);
  }
  tempEndDate = '';
  tempValue = '';
  rangeViewDate = { start: '', end: '' };
  get configOptions() {
    return this._configOptions;
  }

  setRangeViewDate(type: 'start' | 'end', value) {
    this.rangeViewDate[type] = value;
  }
  setTempValue() {
    // this.value = JSON.parse(JSON.stringify(this.value));
    this.popoverIsOpen = true;

    this.tempValue = JSON.parse(JSON.stringify(this.value));
  }
  resetValue() {
    // console.log(this.value);
    this.popoverIsOpen = false;
    if (this.configOptions.isRange) {
      this.setDateRange(this.value);
      // this.setRangeDisplayValue();
    } else {
      this.tempValue = JSON.parse(JSON.stringify(this.value));
      this.displayValue = moment(this.value).isValid()
        ? moment(this.value).format(this.configOptions.displayFormat)
        : '';
    }
    this.setDisplayValue();
  }
  setValue() {
    if (this.configOptions.isRange) {
      let startDate = moment(this.dateRange.start).format('YYYY-MM-DD');
      let endDate = moment(this.dateRange.end).format('YYYY-MM-DD');
      this.value = `${startDate} - ${endDate}`;
    } else {
      let formattedDate = moment(this.tempValue).format('YYYY-MM-DD');

      this.value = JSON.parse(JSON.stringify(formattedDate));
    }

    this.onChange(this.value);
    this.onEduChange.emit(this.value);
    this.popoverState = !this.popoverState;
  }
  datepickerSingleChange(param) {
    // console.log('datepickerchange - ', param);
    let formattedDate = moment(param).format('YYYY-MM-DD');
    this.tempValue = formattedDate;
    this.displayValue = moment(param).format(this.configOptions.displayFormat);
    if (this.configOptions.inline) {
      this.value = formattedDate;
      this.onChange(this.value);
      this.onEduChange.emit(this.value);
    } else {
      this.tempValue = formattedDate;
    }
    this.cd.markForCheck();
  }

  mousechangeSetDateRange(isodate) {
    this.tempEndDate = isodate;
  }

  setDisplayValue() {
    if (this.configOptions.isRange) {
      let startDate = moment(this.dateRange.start);
      let endDate = moment(this.dateRange.end);
      if (startDate.isValid() && endDate.isValid()) {
        this.displayValue = `${startDate.format(
          this.configOptions.displayFormat
        )} - ${endDate.format(this.configOptions.displayFormat)}`;
      } else {
        this.displayValue = '';
      }
    } else {
      this.displayValue = moment(this.dateSingle).isValid()
        ? moment(this.dateSingle).format(this.configOptions.displayFormat)
        : '';
    }
  }

  setRangeDisplayValue() {
    let startDate = moment(this.dateRange.start);
    let endDate = moment(this.dateRange.end);
    if (startDate.isValid() && endDate.isValid()) {
      this.displayValue = `${startDate.format(
        this.configOptions.displayFormat
      )} - ${endDate.format(this.configOptions.displayFormat)}`;
    } else {
      this.displayValue = '';
    }
  }
  setDateRange(param: string) {
    if (param === null) {
      this.dateRange.start = null;
      this.dateRange.end = null;
    } else {
      this.dateRange.start = moment(param.substring(0, 10)).format('YYYYMMDD');
      this.dateRange.end = moment(param.substring(12, 23)).format('YYYYMMDD');
    }

    // console.log('set daterange', param);
    this.viewDateRange = { ...this.dateRange };
  }

  dateRangeChange(dateRange) {
    // console.log('dateRangeChange', dateRange);
    this.viewDateRange = { ...dateRange };
    this.dateRange = { ...dateRange };
    let isDiffMonth =
      moment(dateRange.start).month() !== moment(dateRange.end).month();
    if (
      dateRange.end !== null &&
      dateRange.start !== null &&
      !this.startDp.isWithinViewValues &&
      isDiffMonth
    ) {
      this.startDp.viewValue = moment(dateRange.start);
      this.startDp.setActiveDayView();

      this.cd.markForCheck();
    }

    if (!Boolean(this.configOptions.inline)) {
      let startDate =
        this.dateRange.start !== null
          ? moment(this.dateRange.start).format(
              this.configOptions.displayFormat
            )
          : '';
      let endDate =
        this.dateRange.end !== null
          ? moment(this.dateRange.end).format(this.configOptions.displayFormat)
          : '';

      let sign = startDate.length > 0 || endDate.length > 0 ? ' - ' : '';
      this.displayValue = `${startDate}${sign}${endDate}`;
    } else {
      let start = moment(this.dateRange.start);
      let end = moment(this.dateRange.end);
      if (start.isValid() && end.isValid()) {
        this.value = `${start.format('YYYY-MM-DD')} - ${end.format(
          'YYYY-MM-DD'
        )}`;
        this.onChange(this.value);
        this.onEduChange.emit(this.value);
        // console.log('VALID END ', this.value);
      }
    }
  }
  dateRange = { start: null, end: null };
  viewDateRange = { start: null, end: null };
  displayValue = '';
  dateSingle = '';
  _value = null;
  set value(param) {
    this._value = param;
    if (this.configOptions.isRange) {
      this.setDateRange(param);
      // this.setDisplayValue()
      // this.setRangeDisplayValue();
    } else {
      this.dateSingle = moment(param).format('YYYYMMDD');

      // console.log('SINGLE DATE -- ISVALID', moment(param).isValid());
      // this.displayValue = moment(param).isValid()
      //   ? moment(param).format(this.configOptions.displayFormat)
      //   : '';
    }
    this.setDisplayValue();
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
    // if (this.isDisabled != undefined) {
    //   this.disabled = this.isDisabled;
    // }
  }
}
