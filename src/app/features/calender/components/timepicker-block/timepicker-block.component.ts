import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
  AfterViewInit,
  forwardRef,
  ChangeDetectorRef,
  ViewChild
} from '@angular/core';
import { Renderer2, ElementRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'edu-timepicker-block',
  templateUrl: './timepicker-block.component.html',
  styleUrls: ['./timepicker-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TimepickerBlockComponent)
    }
  ]
})
export class TimepickerBlockComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  @Output() onValueChange = new EventEmitter<any>();
  @Input('alignment') alignment = 'center'; //left right center
  @Input('disabled') disabled = false;
  @Input('elementId') elementId = 'timepickerblock';
  @Output('edu-change') onEduChange = new EventEmitter<any>();

  _value;
  $value = new BehaviorSubject('');
  display2Digit(value: number) {
    if (value < 10) {
      return `0${value}`;
    } else {
      return value;
    }
  }

  set value(param) {
    this.$value.next(param);
  }
  get value() {
    return this._value;
  }
  elState;
  popoverToogleVar = false;
  hour = new Array(24);
  min = new Array(60);
  activeTime: any = { hour: null, min: null };
  activeHour = null;
  activeMin = null;
  tempValue = {};

  constructor(private cd: ChangeDetectorRef, private el: ElementRef) {}

  ngOnInit(): void {
    this.setElementId();
    this.$value.pipe(distinctUntilChanged()).subscribe(param => {
      setTimeout(() => {
        // console.log('update here - ' + param);

        param = this.sanitizeNullAndUndefined(param);
        this.activeTime = this.parseStringToTime(param);
        this.activeHour = this.activeTime.hour;
        this.activeMin = this.activeTime.min;

        let timeInString = this.getActiveTimeInString();

        this.onChange(param);
        this._value = param;
        this.onEduChange.emit(param);
        this.cd.markForCheck();
      });
    });
  }
  ngAfterViewInit() {}
  setElementId() {
    let elId = this.el.nativeElement.getAttribute('formcontrolname');
    if (this.el != undefined) {
      this.elementId = elId;
    }
  }

  getElId(val) {
    return `${this.elementId}-${val}`;
  }

  updateMin(min) {
    this.activeTime.min = min;
    if (this.activeTime.hour != null) {
      this.value = this.getActiveTimeInString();
    }
  }
  updateHour(hour) {
    this.activeTime.hour = hour;
    if (this.activeTime.min != null) {
      this.value = this.getActiveTimeInString();
    }
  }

  sanitizeNullAndUndefined(value: string) {
    if (
      value === null ||
      value == undefined ||
      value.length > 5 ||
      value == ''
    ) {
      return '';
    }
    let indexOfColon = value.indexOf(':');
    let h = parseInt(value.substring(0, indexOfColon));
    let min = parseInt(value.substring(indexOfColon + 1, value.length + 1));
    if (h > 23 || h < 0 || min < 0 || min > 60) {
      // console.log('returning blank');
      return '';
    }

    return value;
  }

  getActiveTimeInString() {
    // console.log(this.activeTime);
    let displayText = ``;
    if (this.activeTime.hour === null && this.activeTime.min === null) {
      displayText = ``;
    } else {
      displayText = `
      ${this.formatTimeToDoubleDigit(
        this.activeTime.hour
      )}:${this.formatTimeToDoubleDigit(this.activeTime.min)}`;
      displayText = displayText.trim();
    }
    return displayText;
  }
  formatTimeToDoubleDigit(time) {
    return time > 9 ? `${time}` : `0${time}`;
  }

  parseStringToTime(timeInString: string) {
    if (timeInString == '') {
      return { hour: null, min: null };
    } else {
      let time = { hour: 0, min: 0 };
      timeInString = timeInString.trim();
      time.hour = parseInt(timeInString.substring(0, 2));
      time.min = parseInt(timeInString.substring(3, 5));
      return time;
    }
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
    this.elState = 'disabled';
    this.cd.markForCheck();
  }
}
