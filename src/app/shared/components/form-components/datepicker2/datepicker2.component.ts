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
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { ValidatorService } from '../validator/validator.service';
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
    private cd: ChangeDetectorRef,
    private validatorService: ValidatorService
  ) {}

  ngOnInit(): void {
    this.setElementID();
    this.registerHasErrorEvent();
  }
  ngAfterViewInit() {
    // console.log(this.inputEl);
  }
  TAB_KEY_CODE = 9;
  @ViewChild('dp') dp: any;
  @ViewChild('inputEl') inputEl;
  @ViewChild('validator') validator: any;
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
  dpIsActive = false; // can delete this soon

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
    // console.log(event);
    let dateObj = event.singleDate.date;
    // console.log(event);

    this.displayedValue = `${this.formatDayMonth(
      dateObj.day
    )}/${this.formatDayMonth(dateObj.month)}/${this.formatYear(dateObj.year)}`;
    this.value = `${dateObj.year}-${this.formatDayMonth(
      dateObj.month
    )}-${this.formatDayMonth(dateObj.day)}`;
    this.cd.markForCheck();
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
    this.val = val;
    this.onChange(val);
    // this.onDateDataChanged.emit(val);
    this.onTouched();
    // this.onTouched(val)
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

  myDatePickerOptions: IAngularMyDpOptions = {
    selectorWidth: '286px',
    selectorHeight: '280px',
    dateFormat: 'dd/mm/yyyy',
    markCurrentDay: false,
    markCurrentMonth: false,
    markCurrentYear: false,
    sunHighlight: false,
    satHighlight: false,
    showMonthNumber: false,
    monthLabels: {
      1: 'January ',
      2: 'February ',
      3: 'March ',
      4: 'April ',
      5: 'May',
      6: 'June ',
      7: 'July ',
      8: 'August ',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December'
    },
    stylesData: {
      styles: `
            .myDpSelectorArrowLeft:after, .myDpSelectorArrowLeft:before{
              left : 50%;
            }
            .myDpSelectorArrowLeft:after{
              border-bottom-color: white;
            }
            .myDpSelector.myDpSelectorArrow.myDpSelectorArrowLeft.myDpSelectorAbsolute{
              padding:11px;
              broder-color:red;
              background:white;
            }
            .myDpIconLeftArrow,
            .myDpIconRightArrow  {
      
            }  
            .myDpMonthBtn, .myDpYearBtn {
              font: 500 14px/16px Raleway;
              color : #212121;
            }
            .myDpIconLeftArrow::before{
              content:url("/assets/date-picker_arrow-left.svg") ; 
            }
            .myDpIconRightArrow::before{
              content:url("/assets/date-picker_arrow-right.svg") ; 
            }
            th.myDpWeekDayTitle{
              font: 600 12px/14px Raleway;
              color: #A5AEC7;
            }
            .myDpNextMonth  .myDpTableSingleDay, .myDpPrevMonth  .myDpTableSingleDay{
              font: 400 12px/14px Roboto;
              color:#A5AEC7;
            }
           .myDpCurrMonth  .myDpTableSingleDay{
              font: 400 12px/14px Roboto;
              color : #212121;
            }
             .myDpSelectedDay, .myDpSelectedMonth, .myDpSelectedYear  {  
              background:unset;
            }
          
            .myDpDaycell:focus, .myDpMonthcell:focus, .myDpYearcell:focus {
              box-shadow: unset;
              outline-width: 0;
           }
            .myDpSelectedDay span, .myDpMarkCurrDay, .myDpMarkCurrMonth, .myDpMarkCurrYear { 
              border-width:0px !important;
              color:  white;
              background: #69A9F2;
            }
            .myDpDayValue{
              width: 38px;
              height: 38px;
              display: flex;
              justify-content: center;
              align-items: center;
        
            }
            .myDpDaycell {
              border-radius: 50%;
            }
            .myDpDayValue{
              width: 35px;
              height: 35px;
              display: flex;
              border-radius: 50%;
              justify-content: center;
              align-items: center;
            }
            .myDpTableSingleMonth{
              width:50%;
            }
            .myDpMonthNbr{
              display:none;
            }
        
    
        `
    }
    // other options here
  };

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
  // disabled: boolean = false;
  writeValue(value: any) {
    if (value != null && value.length === 10) {
      this.value = value;
      // console.log(this.value);
      //need parse value > displayedValue

      this.displayedValue = this.convertValuetoDisplayedValue(value);
      this.updateDatePickerModel();
    }
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
