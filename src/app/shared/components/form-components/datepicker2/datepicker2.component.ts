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
  ChangeDetectionStrategy
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
import { distinctUntilChanged } from 'rxjs/operators';
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
  syncValueWithModel() {
    let dateObj: any = this.model ? this.model.singleDate.date : this.model;
    let modelInValueFormat = this.formatDateObjToValue(dateObj);
    // console.log(modelInValueFormat, this.value);
    if (modelInValueFormat !== this.value) {
      this.updateDatePickerModel();
      this.cd.markForCheck();
    }
    // this.updateDatePickerModel();
  }
  constructor(
    private el: ElementRef,
    private cd: ChangeDetectorRef,
    private validatorService: ValidatorService
  ) {}

  ngOnInit(): void {
    // console.log('datepicker init - ' + this.elementId + ',' + this.value);
    this.setElementID();
    this.registerHasErrorEvent();
    this.onDateChange$.pipe(distinctUntilChanged()).subscribe(event => {
      let dateObj = event.singleDate.date;
      // console.log(event);
      // console.log(`on date change`, dateObj);
      this.displayedValue = this.formatDateObjToDisplayValue(dateObj);
      this.value = this.formatDateObjToValue(dateObj);

      this.cd.markForCheck();
    });
  }
  ngAfterViewInit() {
    // console.log('after init - ' + this.value);
    this.ngafterViewHookPassed = true;
    // console.log(this.inputEl);
  }
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
  @Input('disabled') set disabled(disabled) {
    this._disabled = disabled;
  }
  _disabled = false;
  hasError = false;
  tempId = 'datepickerinputid';
  model: IMyDateModel = null;
  dpIsActive = false; // can delete this soon
  onDateChange$: Subject<IMyDateModel> = new Subject();
  _elState = 'inactive';
  set elState(state) {
    this._elState = state;
    if (this.elState === 'active') {
      this.onTouched();
      this.dp.openCalendar();
    }
    this.cd.markForCheck();
  }
  get elState() {
    return this._elState;
  }

  dpClick() {
    if (this.elState == 'inactive') {
      this.elState = 'active';
      this.syncValueWithModel();

      this.dp.openCalendar();
    } else {
      this.dp.closeCalendar();
    }
    // this.dp.toggleCalendar();
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

  calendarBlur(option) {
    // 2 = calendar closed by date select
    // 3 = calendar closed by calendar button
    // 4 = calendar closed by outside click (document click)
    // 5 = calendar closed by ESC key

    this.onTouched();
    // console.log(`CALENDAR BLUR @ ${option}`);
    if (option == 2) {
      // console.log(`CALENDAR BLUR @ 2`);

      this.onChange(this.value);
      this.onEduChange.emit(this.value);
    }

    if (option > 1) {
      this.elState = 'inactive';
      this.dpIsActive = false;
    }
  }

  updateDatePickerModel() {
    const dateValue = this.displayedValue;
    // console.log(this.displayedValue);
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
    console.log('datechanged - ', event);
    this.onDateChange$.next(event);
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
    // console.log('EDU CHANGE DATEPICKER - ' + val);
    val = this.cleanInputValue(val);

    this.val = val;
    this.displayedValue = this.convertValuetoDisplayedValue(val);

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
    // this value is updated by programmatic changes if( val !== undefined && this.val !== val){
    this.displayedVal = val;
    // this.onChange(val);
    // this.onTouched();
    // this.onTouched(val)
  }
  get displayedValue() {
    return this.displayedVal;
  }
  cleanInputValue(val) {
    if (typeof val != 'string' || val.length != 10) {
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

  myDatePickerOptions: IAngularMyDpOptions = myDatePickerOptions;
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
