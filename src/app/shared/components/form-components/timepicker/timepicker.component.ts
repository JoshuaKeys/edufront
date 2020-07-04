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
import { PopoverComponent } from '../popover/popover.component';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'edu-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => TimepickerComponent)
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimepickerComponent
  implements OnInit, AfterViewInit, ControlValueAccessor {
  @Output() onValueChange = new EventEmitter<any>();
  @Input('alignment') alignment = 'center'; //left right center
  @Input('disabled') disabled = false;
  @Input('elementId') elementId = 'timepicker';
  @Output('edu-change') onEduChange = new EventEmitter<any>();
  @ViewChild(PopoverComponent) popover: PopoverComponent;

  displayText = '';
  value$ = new Subject();
  _value;
  set value(param) {
    // console.log('SET VAL');
    // console.log(param);
    param = this.sanitizeNullAndUndefined(param);
    this.activeTime = this.parseStringToTime(param);
    this._value = param;

    this.value$.next(param);
  }
  get value() {
    return this._value;
  }
  elState;
  popoverToogleVar = false;
  hour = new Array(24);
  min = new Array(60);
  activeTime: any = {};
  tempValue = {};

  constructor(private cd: ChangeDetectorRef, private el: ElementRef) {}
  isAfterViewInit = false;
  ngOnInit(): void {
    this.value$.pipe(distinctUntilChanged()).subscribe(param => {
      this.setDisplayText();
      if (this.isAfterViewInit) {
        console.log('pushing change to after view init');
        this.onChange(param);
        this.onEduChange.emit(param);
      }
    });
  }
  ngAfterViewInit() {
    this.isAfterViewInit = true;
    // this.popover.openEvent.subscribe(() => {
    //   console.log('popover event');
    //   this.elState = 'active';
    //   this.cd.markForCheck();
    // });
    // this.popover.closeEvent.subscribe(() => {
    //   console.log('popover event');
    //   this.elState = 'inactive';
    //   this.cd.markForCheck();
    // });
  }
  setElementId() {
    let elId = this.el.nativeElement.getAttribute('formcontrolname');
    if (this.el != undefined) {
      this.elementId = elId;
    }
  }

  sanitizeNullAndUndefined(value) {
    if (value === null || value == undefined) {
      return '';
    }
    return value;
  }

  setActiveTime(type, value) {
    if (type == 'hour') {
      this.activeTime.hour = value;
    } else {
      this.activeTime.min = value;
    }
    this.setDisplayText();
  }

  isActive(type, value) {
    if (type == 'hour') {
      return this.activeTime.hour == value;
    } else {
      return this.activeTime.min == value;
    }
  }

  setDisplayText() {
    // console.log(this.activeTime);
    if (JSON.stringify(this.activeTime) === `{}`) {
      this.displayText = ``;
    } else {
      this.displayText = `
      ${this.formatTimeToDoubleDigit(
        this.activeTime.hour
      )}:${this.formatTimeToDoubleDigit(this.activeTime.min)}`;
      this.displayText = this.displayText.trim();
    }
  }
  formatTimeToDoubleDigit(time) {
    return time > 9 ? `${time}` : `0${time}`;
  }

  parseStringToTime(timeInString: string) {
    if (timeInString == '' || typeof timeInString != 'string') {
      return {};
    } else {
      let time = { hour: 0, min: 0 };

      time.hour = parseInt(timeInString.substring(0, 2));
      time.min = parseInt(timeInString.substring(3, 5));
      return time;
    }
  }

  isLabelActive() {
    return (
      this.elState === 'active' || (this.displayText != '' && this.displayText)
    );
  }

  popoverClose() {
    if (JSON.stringify(this.tempValue) !== JSON.stringify(this.activeTime)) {
      this.value = this.displayText;
    }
  }
  popoverOpen() {
    if (Object.keys(this.activeTime).length == 0) {
      this.activeTime = { hour: 0, min: 0 };
    }
    this.tempValue = JSON.parse(JSON.stringify(this.activeTime));
    this.cd.markForCheck();
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
