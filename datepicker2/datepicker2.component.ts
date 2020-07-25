import {
  Component,
  OnInit,
  ChangeDetectorRef,
  forwardRef,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  Renderer2,
  ApplicationRef
} from '@angular/core';
import { myDatePickerOptions } from './datepicker2-config';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  IAngularMyDpOptions,
  IMyDateModel,
  AngularMyDatePickerDirective
} from 'angular-mydatepicker';
import { ValidatorService } from '../validator/validator.service';
import { Subject, Observable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
@Component({
  selector: 'edu-datepicker',
  templateUrl: './datepicker2.component.html',
  styleUrls: [
    './datepicker2.component.scss',
    './datepicker-style-overwrite.scss'
  ],
  providers: [
    ValidatorService,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => Datepicker2Component)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Datepicker2Component
  implements OnInit, AfterViewInit, ControlValueAccessor {
  constructor(
    private el: ElementRef,
    private render: Renderer2,
    private cd: ChangeDetectorRef,
    private appRef: ApplicationRef,
    private validatorService: ValidatorService
  ) {}

  ngOnInit(): void {
    // console.log('datepicker init - ' + this.elementId + ',' + this.value);
    this.setElementID();
    this.registerHasErrorEvent();

    // this.checkForReset$
    //   .pipe(
    //     distinctUntilChanged(),
    //     filter(value => value === '')
    //   )
    //   .subscribe(value => {
    //     if (this.dp) {
    //       this.dp.clearDate();
    //       console.log(this.elementId, JSON.stringify(this.model, null, 2));
    //     }
    //     console.log(`checkForReset$.`, value, value === '');
    //   });

    this.onDateChange$.pipe(distinctUntilChanged()).subscribe(event => {
      let isSingleDate = !Boolean(event.dateRange);
      console.log(isSingleDate);
      if (isSingleDate) {
        this.updateOnSingleDateChange(event);
      } else {
        this.updateOnDateRangeChange(event);
      }

      this.cd.markForCheck();
    });
  }
  ngAfterViewInit() {
    // console.log('after init - ' + this.value);
    this.ngafterViewHookPassed = true;
    // setTimeout(() => {
    //   this.updateDatePickerModel();
    // }, 1);
    // console.log(this.inputEl);
  }
  myDatePickerOptions: IAngularMyDpOptions = myDatePickerOptions;

  ngafterViewHookPassed = false;
  TAB_KEY_CODE = 9;
  @ViewChild('dp') dp: AngularMyDatePickerDirective;
  @ViewChild('inputEl') inputEl;
  @ViewChild('validator') validator: any;
  @Input('alignment') alignment = 'center';
  @Input('labelIsPlaceholder') labelIsPlaceholder = false;
  @Input('elementId') elementId = eid;
  @Output() onDateDataChanged = new EventEmitter<string>();
  @Output('edu-change') onEduChange = new EventEmitter<string>();
  isRange = false;
  @Input('edu-datepicker-options') set options(options) {
    let newOptions = { ...myDatePickerOptions, ...options };
    console.log(this.elementId, options);
    this.myDatePickerOptions = newOptions;
    if (options.inline) {
      this.render.addClass(this.el.nativeElement, 'isInline');
    }
    this.isRange = Boolean(options.dateRange);
    if (!Boolean(options.dateRange)) {
      this.render.addClass(this.el.nativeElement, 'isNotRange');
    }
    if (Boolean(options.hideBorder)) {
      this.render.addClass(this.el.nativeElement, 'hideBorder');
    }
  }

  @Input('disabled') set disabled(disabled) {
    this._disabled = disabled;
  }
  _disabled = false;
  hasError = false;
  tempId = 'datepickerinputid';
  model: IMyDateModel = null;
  dpIsActive = false; // can delete this soon
  onDateChange$: Subject<IMyDateModel> = new Subject();
  checkForReset$: Subject<any> = new Subject();
  _elState = 'inactive';
  set elState(state) {
    this._elState = state;
    this.onTouched();
  }
  get elState() {
    return this._elState;
  }

  dpClick() {
    if (this.elState == 'inactive') {
      this.updateDatePickerModel();

      this.elState = 'active';
      setTimeout(() => {
        this.dp.openCalendar();
      }, 1);
    }
    this.cd.markForCheck();
  }
  cbFocus() {
    this.elState = 'active';
    // console.log('should be active now');
  }
  cbBlur() {
    //change to rxjs operator later
    setTimeout(() => {
      if (!this.el.nativeElement.contains(document.activeElement)) {
        this.elState = 'inactive';
        this.dpIsActive = false;
        this.onTouched();
        this.cd.markForCheck();
      }
    }, 150);
  }

  cbChange() {
    if (this.dpIsActive) {
      this.elState = 'active';
    } else {
      this.elState = 'inactive';
    }
  }

  isLabelActive() {
    return (
      this.dpIsActive || (typeof this.value == 'string' && this.value != '')
    );
  }

  setElementID() {
    let elementIdDefined = this.elementId !== eid;
    let formcontrolnamedefined =
      this.el.nativeElement.getAttribute('formcontrolname') !== undefined;
    if (!elementIdDefined && formcontrolnamedefined) {
      this.elementId = this.el.nativeElement.getAttribute('formcontrolname');
    }
  }

  updateOnDateRangeChange(event) {
    let startDateObj = event.dateRange.beginDate;
    let endDateObj = event.dateRange.endDate;
    this.displayedValue = `${this.formatDateObjToDisplayValue(
      startDateObj
    )} - ${this.formatDateObjToDisplayValue(endDateObj)}`;
    this.value = `${this.formatDateObjToValue(
      startDateObj
    )} - ${this.formatDateObjToValue(endDateObj)}`;
    // this.value = this.formatDateObjToValue(dateObj);
  }

  updateOnSingleDateChange(event) {
    let dateObj = event.singleDate.date;
    this.displayedValue = this.formatDateObjToDisplayValue(dateObj);
    this.value = this.formatDateObjToValue(dateObj);
  }

  calendarBlur(option) {
    // 2 = calendar closed by date select
    // 3 = calendar closed by calendar button
    // 4 = calendar closed by outside click (document click)
    // 5 = calendar closed by ESC key

    this.onTouched();
    // console.log(`CALENDAR BLUR @ ${option}`);
    if (option == 2) {
      console.log(`CALENDAR BLUR @ 2`);

      // this.onChange(this.value);
      // this.onEduChange.emit(this.value);
      // this.onDateDataChanged.emit(this.value);
    }

    if (option > 1) {
      this.elState = 'inactive';
      this.dpIsActive = false;
    }
  }

  getDateObj(dateValue) {
    let day = parseInt(dateValue.substring(0, 2));
    let month = parseInt(dateValue.substring(3, 5));
    let year = parseInt(dateValue.substring(6, 8));
    year = year < 50 ? year + 2000 : year + 1900;
    return { year, month, day };
  }
  getDateInValueFormat(year, month, day) {
    return `${year}-${this.formatDayMonth(month)}-${this.formatDayMonth(day)}`;
  }
  updateDatePickerModel() {
    const dateValue = this.displayedValue;

    if (!this.isRange) {
      let dateObj = this.getDateObj(this.displayedValue);

      let model: IMyDateModel = {
        isRange: false,
        singleDate: {
          date: dateObj
        },
        dateRange: null
      };
      setTimeout(() => {
        this.model = isNaN(dateObj.year) ? null : model;
      }, 1);
    } else {
      let beginDate = this.getDateObj(this.displayedValue.substring(0, 8));
      let endDate = this.getDateObj(this.displayedValue.substring(11, 20));

      let model: IMyDateModel = {
        isRange: true,
        singleDate: null,
        dateRange: {
          beginDate,
          endDate
        }
      };
      setTimeout(() => {
        this.model = isNaN(beginDate.year) ? null : model;
      }, 1);
    }

    // this.cd.markForCheck();
  }

  onDateChanged(event: IMyDateModel): void {
    // date selected
    this.onDateChange$.next(event);

    this.onChange(this.value);
    this.onEduChange.emit(this.value);
    this.onDateDataChanged.emit(this.value);
    console.log('ONDATE CHANGED');
  }
  keyboardEvent(keycode, isShift, event) {
    if (keycode === this.TAB_KEY_CODE) {
      event.preventDefault();
      this.elState = 'inactive';
      this.dpIsActive = false;
      this.dp.closeCalendar();
    }
  }

  @HostListener('keydown', ['$event']) onKeydown($event) {
    //stops propagation on lower layers

    this.keyboardEvent($event.keyCode, $event.shiftKey, $event);
    // $event.preventDefault();
    //need able this but include support for tab out
    // $event.stopPropagation();
  }

  val;
  //value should be yyyy-mm-dd
  set value(val) {
    // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    val = this.cleanInputValue(val);

    this.val = val;
    if (!this.isRange) {
      this.displayedValue = this.convertValuetoDisplayedValue(val);
    } else {
      this.displayedValue = this.convertRangeValuetoDisplayedValue(val);
    }
    console.log(val.lenght);

    this.updateDatePickerModel();

    console.log(this.elementId, this.model);
    this.checkForReset$.next(val);

    // if (this.ngafterViewHookPassed) {
    // this.onChange(val);
    // this.onEduChange.emit(val);
    // this.onTouched();
    // }
    this.cd.markForCheck();

    // if (this.ngafterViewHookPassed) {
    //   this.val = val;
    //   this.onChange(val);
    //   this.onEduChange.emit(val);
    //   this.onTouched();
    //   this.cd.markForCheck();
    // }
  }
  get value() {
    return this.val;
  }
  displayedVal;
  //value should be dd/mm/yy
  set displayedValue(val) {
    this.displayedVal = val;
  }
  get displayedValue() {
    return this.displayedVal;
  }
  cleanInputValue(val) {
    let isNotRightFormat =
      typeof val != 'string' || !(val.length == 10 || val.length == 23);
    if (isNotRightFormat) {
      if (this.dp && this.dp.isDateValid()) {
        this.dp.clearDate();
      }
      return '';
    } else {
      return val;
    }
  }

  formatDateObjToDisplayValue(dateObj: {
    month: number;
    year: number;
    day: number;
  }) {
    return `${this.formatDayMonth(dateObj.day)}/${this.formatDayMonth(
      dateObj.month
    )}/${this.formatYear(dateObj.year)}`;
  }
  formatDateObjToValue(
    dateObj: { month: number; year: number; day: number } | null
  ) {
    if (dateObj == null) {
      return '';
    }
    return `${dateObj.year}-${this.formatDayMonth(
      dateObj.month
    )}-${this.formatDayMonth(dateObj.day)}`;
  }

  formatDayMonth(param) {
    return param < 10 ? `0${param}` : `${param}`;
  }
  formatYear(param) {
    return param.toString().substring(2, 4);
  }
  convertRangeValuetoDisplayedValue(dateRange) {
    console.log(dateRange);
    if (dateRange.length == 23) {
      let startDate = dateRange.substring(0, 10);
      let endDate = dateRange.substring(13, 23);
      console.log(startDate, endDate);
      startDate = this.convertValuetoDisplayedValue(startDate);
      endDate = this.convertValuetoDisplayedValue(endDate);
      console.log(startDate.length, endDate.length);
      console.log(startDate, endDate);
      if (startDate.length !== 8 || endDate.length !== 8) {
        return '';
      } else {
        return `${startDate} - ${endDate}`;
      }
    } else {
      return '';
    }
  }
  convertValuetoDisplayedValue(value: string) {
    if (value.length == 10) {
      const day = value.substring(8, 10);
      const month = value.substring(5, 7);
      const year = value.substring(2, 4);

      // console.log(`${day}/${month}/${year}`);
      return `${day}/${month}/${year}`;
    } else {
      return '';
    }
  }

  registerHasErrorEvent() {
    this.registerValidatorPosition();

    this.validatorService.validatorHasError.subscribe(hasError => {
      this.hasError = hasError;
      this.cd.markForCheck();
    });
  }

  registerValidatorPosition() {
    let possiblePositions = ['left', 'right', 'bottom', 'bottom-flow'];
    this.validatorService.validatorPosition.subscribe(position => {
      if (
        possiblePositions.indexOf(position) != -1 &&
        this.validator &&
        !this.validator.nativeElement.classList.contains(position)
      ) {
        this.validator.nativeElement.classList.add(position);
      }
      // console.log(this.validator.nativeElement.classList);
      // console.log(position);
    });
  }

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
const eid = 'datepickerEID';
