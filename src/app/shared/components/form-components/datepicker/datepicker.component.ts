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
  EventEmitter
} from '@angular/core';
import { ValidatorService } from '../validator/validator.service';
import { myDatePickerOptions } from './datepicker-config';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
//v1 which might be deleted
@Component({
  selector: 'edu-datepicker-temp',
  templateUrl: './datepicker.component.html',
  styleUrls: [
    './datepicker.component.scss',
    './datepicker-style-overwrite.scss'
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DatepickerComponent)
    },
    ValidatorService
  ]
})
export class DatepickerComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  constructor(
    private el: ElementRef,
    private cd: ChangeDetectorRef,
    private validatorService: ValidatorService
  ) {}

  ngOnInit(): void {
    this.setElementID();
    this.registerHasErrorEvent();
  }
  ngAfterViewInit() {
    // console.log('registering stuff');
    this.registerValidatorPosition();
  }

  TAB_KEY_CODE = 9;
  @ViewChild('dp') dp: any;
  @ViewChild('validator') validator: any;
  @ViewChild('inputEl') inputEl;
  @Input('alignment') alignment = 'center';
  @Input('labelIsPlaceholder') labelIsPlaceholder = false;
  @Input('elementId') elementId = 'tempDatepickerId123';
  @Output() onDateDataChanged = new EventEmitter<string>();
  @Input('disabled') set disabled(disabled) {
    this._disabled = disabled;
  }
  _disabled = false;
  hasError = false;
  tempId = 'datepickerinputid';
  model: IMyDateModel = null;
  dpIsActive = false;
  myDatePickerOptions = myDatePickerOptions;

  _elState = 'inactive';
  set elState(state) {
    this._elState = state;
    if (this.elState === 'active') {
      this.onTouched();
      // this.dpIsActive = true;
      this.dp.openCalendar();
    }
    this.cd.markForCheck();
  }
  get elState() {
    return this._elState;
  }

  val;
  set value(val) {
    //value should be yyyy-mm-dd
    this.val = val;
    this.onChange(val);
    this.onTouched();
  }
  get value() {
    return this.val;
  }
  _displayedValue;

  set displayedValue(val) {
    //value should be dd/mm/yy
    this._displayedValue = val;
  }

  cbFocus() {
    this.elState = 'active';
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
    if (this.el.nativeElement.getAttribute('formcontrolname') !== undefined) {
      this.elementId = this.el.nativeElement.getAttribute('formcontrolname');
    }
  }

  calendarBlur(option) {
    // 2 = calendar closed by date select
    // 3 = calendar closed by calendar button
    // 4 = calendar closed by outside click (document click)
    // 5 = calendar closed by ESC key
    if (option > 1) {
      this.elState = 'inactive';
      this.dpIsActive = false;
    }
  }

  updateDatePickerModel() {
    const dateValue = this._displayedValue;
    // console.log(this._displayedValue);
    let day = parseInt(dateValue.substring(0, 2));
    let month = parseInt(dateValue.substring(3, 5));
    let year = parseInt(dateValue.substring(6, 8));
    year = year < 50 ? year + 2000 : year + 1900;

    this.value = `${year}-${this.formatDayMonth(month)}-${this.formatDayMonth(
      day
    )}`;

    let model: IMyDateModel = {
      isRange: false,
      singleDate: {
        jsDate: new Date(),
        date: { year, month, day }
      },
      dateRange: null
    };
    this.model = model;
    // console.log(this.model);
  }

  onDateChanged(event: IMyDateModel): void {
    // date selected
    let dateObj = event.singleDate.date;

    this._displayedValue = `${this.formatDayMonth(
      dateObj.day
    )}/${this.formatDayMonth(dateObj.month)}/${this.formatYear(dateObj.year)}`;
    this.value = `${dateObj.year}-${this.formatDayMonth(
      dateObj.month
    )}-${this.formatDayMonth(dateObj.day)}`;
  }
  keyboardEvent(keycode, isShift, event) {
    // console.log(keycode);
    // console.log(isShift);
    // console.log(event);
    if (keycode === this.TAB_KEY_CODE) {
      // event.preventDefault();
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

  formatDayMonth(param) {
    return param < 10 ? `0${param}` : `${param}`;
  }
  formatYear(param) {
    return param.toString().substring(2, 4);
  }

  convertValuetoDisplayedValue(value: string) {
    const day = value.substring(8, 10);
    const month = value.substring(5, 7);
    const year = value.substring(2, 4);

    // console.log(`${day}/${month}/${year}`);
    return `${day}/${month}/${year}`;
  }

  registerHasErrorEvent() {
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
  // disabled: boolean = false;
  writeValue(value: any) {
    if (value == null || value.length != 10) {
      return;
    }
    this.value = value;
    console.log(this.value);
    //need parse value > displayedValue

    this._displayedValue = this.convertValuetoDisplayedValue(value);
    this.updateDatePickerModel();
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

// onInputBlur() {
//   //only for typable datepicker
//   this.updateDatePickerModel();
// }
