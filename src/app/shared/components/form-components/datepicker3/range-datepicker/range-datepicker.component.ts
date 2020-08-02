import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  forwardRef,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { BaseDatepickerComponent } from '../base-datepicker/base-datepicker.component';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { bufferTime, map, filter } from 'rxjs/operators';
@Component({
  selector: 'edu-range-datepicker',
  templateUrl: './range-datepicker.component.html',
  styleUrls: ['./range-datepicker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => RangeDatepickerComponent)
    }
  ]
})
export class RangeDatepickerComponent extends BaseDatepickerComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  constructor(cd: ChangeDetectorRef) {
    super(cd);
  }
  dayNotSelected = false;

  mouseEvent$: Subject<{
    type: 'enter' | 'leave';
    isodate: string;
  }> = new Subject();
  @Output('edu-mousechange') onMouseChange = new EventEmitter();
  @Output('edu-daterangechange') onDaterangeChange = new EventEmitter();
  @Output('edu-updatesiblingdate') onUpdateSiblingDate = new EventEmitter();
  @Input('viewDate') set viewDate(param) {
    if (moment(param, 'YYYYMMDD').isValid()) {
      this.viewValue = moment(param);
      this.setActiveDayView();
    }
  }
  @Input('tempEndDateOnHover') set tempEndDate(param) {
    // console.log('hover-endDate', param);
    this.selectedDate = moment(param);
    this.cd.markForCheck();
  }

  ngOnInit(): void {
    // console.log('disabled values --', this.disabledValues);
    this.mouseEvent$
      .pipe(
        bufferTime(10),
        filter(mouseEvents => mouseEvents.length > 0),
        map(mouseEvents => {
          let lastIndex = mouseEvents.length - 1;

          return mouseEvents[lastIndex];
        })
      )
      .subscribe(mouseEvent => {
        let onMouseChangeValue =
          mouseEvent.type === 'leave' ? null : mouseEvent.isodate;
        this.onMouseChange.emit(onMouseChangeValue);

        this.cd.markForCheck();
      });
  }

  ngAfterViewInit() {
    this.isAfterViewInit = true;
  }
  isAfterViewInit = false;
  @Input('disabledValues') disabledValues: {
    type: 'before' | 'after';
    isodate: string;
  } = null;

  get isLeftDatepicker() {
    return this.disabledValues.type === 'after';
  }

  get isWithinViewValues() {
    let isInViewData = false;

    Object.keys(this.dayViewData).forEach(key => {
      if (!isInViewData) {
        isInViewData = this.dayViewData[key].indexOf(this.value) !== -1;
      }
    });

    return isInViewData;
  }

  get dateRange() {
    if (this.isLeftDatepicker) {
      return {
        start: moment(this.value),
        end: moment(this.disabledValues.isodate)
      };
    } else {
      return {
        end: moment(this.value),
        start: moment(this.disabledValues.isodate)
      };
    }
  }

  updateSiblingView() {
    if (this.isLeftDatepicker) {
      this.onUpdateSiblingDate.emit(
        this.viewValue
          .clone()
          .add(1, 'M')
          .format('YYYYMMDD')
      );
    } else {
      this.onUpdateSiblingDate.emit(
        this.viewValue
          .clone()
          .subtract(1, 'M')
          .format('YYYYMMDD')
      );
    }
  }
  setMonth(month: string) {
    super.setMonth(month);
    this.updateSiblingView();
  }
  setYear(year: number) {
    super.setYear(year);
    this.updateSiblingView();
  }
  editViewValue(type: 'add' | 'subtract') {
    //should change to leftclick right click TODO

    super.editViewValue(type);
    this.updateSiblingView();
  }

  onMouseEnter(isodate) {
    if (this.dateRange.start.isValid() && !this.dateRange.end.isValid()) {
      if (this.dateRange.start.isBefore(moment(isodate))) {
        this.mouseEvent$.next({ type: 'enter', isodate });
      }
    }
  }
  onMouseExit(isodate) {
    if (this.dateRange.start.isValid() && !this.dateRange.end.isValid()) {
      if (this.dateRange.start.isBefore(moment(isodate))) {
        this.mouseEvent$.next({ type: 'leave', isodate });
        // console.log('MOUSE EXIT');
      }
    }
  }

  onDayClick(isodate) {
    //check for disabled value plus this.viewValue;

    let dateRange = {};
    if (this.dateRange.start.isValid() && !this.dateRange.end.isValid()) {
      // console.log(
      //   'selecting end date',
      //   this.dateRange.start.format('YYYYMMDD'),
      //   isodate,
      //   this.dateRange.start.isAfter(moment(isodate))
      // );
      if (this.dateRange.start.isAfter(isodate)) {
        dateRange = { start: isodate, end: null };
      } else {
        dateRange = {
          start: this.dateRange.start.format('YYYYMMDD'),
          end: isodate
        };

        // this.selectedDate = this.dateRange.start.clone();
        // this.viewValue = this.dateRange.start.clone();
        // this.setActiveDayView();

        // console.log('enddate', dateRange, this.viewValue.format('DD/MM/YY'));
      }
    } else {
      dateRange = { start: isodate, end: null };
    }

    // console.log('CLICK ???', dateRange);

    this.onDaterangeChange.emit(dateRange);
    //if(both is set, reset new start)

    //if only start is set, set end

    // if (this.isDisabled(isodate)) {
    //   return;
    // }
    // let selectingSameDate = this.selectedDate.isSame(isodate);

    // let value;
    // if (!selectingSameDate || this.dayNotSelected) {
    //   value = isodate;
    //   this.viewValue = moment(isodate);
    //   this.selectedDate = moment(isodate);
    //   this.dayNotSelected = false;
    // } else {
    //   value = null;
    //   this.viewValue = moment(isodate);
    //   this.selectedDate = moment(isodate);
    //   this.dayNotSelected = true;
    // }
    // this.onChange(value);
    // this.onEduChange.emit(value);

    // this.cd.markForCheck();
  }

  isDisabled(isodate) {
    if (
      !Boolean(this.disabledValues) ||
      !Boolean(this.disabledValues.isodate)
    ) {
      return false;
    }

    if (this.disabledValues.type === 'before') {
      return moment(isodate).isSameOrBefore(this.disabledValues.isodate);
    } else {
      return moment(isodate).isSameOrAfter(this.disabledValues.isodate);
    }
  }
  isInRange(isodate) {
    let selectingEndDate =
      this.dateRange.start.isValid() && !this.dateRange.end.isValid();
    let bothDatesAreValid =
      this.dateRange.start.isValid() && this.dateRange.end.isValid();

    if (!(selectingEndDate || bothDatesAreValid)) {
      return false;
    }

    if (bothDatesAreValid) {
      return moment(isodate).isBetween(
        this.dateRange.start,
        this.dateRange.end
      );
    }

    return moment(isodate).isBetween(this.dateRange.start, this.selectedDate);
  }

  getDpDayClass(dpDay) {
    return {
      // 'dpDay--disabled': this.isDisabled(dpDay),

      'dpDay--selected':
        this.dateRange.start.isSame(dpDay) ||
        this.dateRange.end.isSame(dpDay) ||
        this.selectedDate.isSame(dpDay),

      'dpDay--inRange': this.isInRange(dpDay)
    };
  }
  //

  _value = '';
  set value(param: string) {
    let paramIsValid = moment(param).isValid();
    let isoParam = paramIsValid ? moment(param).format('YYYYMMDD') : '';
    let isInViewData = false;
    this._value = param;
    Object.keys(this.dayViewData).forEach(key => {
      if (!isInViewData) {
        isInViewData = this.dayViewData[key].indexOf(isoParam) !== -1;
      }
    });
    if (!this.isAfterViewInit) {
      return;
    }
    // console.log(param, this.isAfterViewInit, Boolean(this.viewValue));
    if (!Boolean(this.viewValue)) {
      //initial load
      let selectingEndDate =
        this.dateRange.start.isValid() && !this.dateRange.end.isValid();
      let bothDatesAreValid =
        this.dateRange.start.isValid() && this.dateRange.end.isValid();

      if (!(this.dateRange.start.isValid() && this.dateRange.end.isValid())) {
        if (this.isLeftDatepicker) {
          this.viewValue = moment();
          this.selectedDate = moment(null);
        } else {
          this.viewValue = moment().add(1, 'M');
          this.selectedDate = moment(null);
        }
      } else if (this.dateRange.start.month() === this.dateRange.end.month()) {
        if (this.isLeftDatepicker) {
          this.viewValue = moment(param);
          this.selectedDate = moment(param);
        } else {
          this.viewValue = this.dateRange.start.add(1, 'M');
          this.selectedDate = moment(null);
        }
      } else {
        this.viewValue = moment(param);
        this.selectedDate = moment(param);
      }

      this.setActiveDayView();
    } else {
      // console.log('test213 ', param);
      if (this.dateRange.start.month() === this.dateRange.end.month()) {
        this.selectedDate = moment(param);
      } else if (
        this.dateRange.start.isValid() &&
        this.dateRange.end.isValid()
      ) {
        // console.log('test213 BOTH VALID', param, this.isLeftDatepicker);
        this.selectedDate = moment(param);
        if (!this.isWithinViewValues) {
          this.viewValue = moment(param);
          this.setActiveDayView();
        }
      } else {
        this.selectedDate = moment(param);
      }
    }

    this.cd.markForCheck();
  }
  get value() {
    return this._value;
  }
}
