import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  ViewChild,
  Input,
  EventEmitter,
  ChangeDetectorRef,
  ElementRef,
  OnDestroy,
  forwardRef
} from '@angular/core';
import { PopoverComponent } from 'src/app/shared/components/form-components/popover/popover.component';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'edu-timepicker-popover',
  templateUrl: './timepicker-popover.component.html',
  styleUrls: ['./timepicker-popover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimepickerPopoverComponent implements OnInit, OnDestroy {
  value$ = new Subject();

  @Output() onValueChange = new EventEmitter<any>();

  @Output('edu-change') onEduChange = new EventEmitter<any>();
  @ViewChild(PopoverComponent) popover: PopoverComponent;
  displayText;
  _time;
  @Input('time') set time(param) {
    // console.log('SET VAL');
    param = this.sanitizeNullAndUndefined(param);
    this.activeTime = this.parseStringToTime(param);

    this._time = param;
    this.onEduChange.emit(param);
    this.setDisplayText();
    this.value$.next(param);
  }
  get time() {
    return this._time;
  }
  elState;
  popoverToogleVar = false;
  hour = new Array(24);
  min = new Array(60);
  activeTime: any = {};
  tempValue = {};

  constructor(private cd: ChangeDetectorRef, private el: ElementRef) {}

  ngOnInit(): void {

    this.value$.pipe(distinctUntilChanged()).subscribe(param => {
      setTimeout(() => {
        param = this.sanitizeNullAndUndefined(param);
        this._time = param;
        this.onEduChange.emit(param);
        this.cd.markForCheck();
      });
    });
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
      this.time = this.displayText;
    }
  }
  popoverOpen() {
    if (Object.keys(this.activeTime).length == 0) {
      this.activeTime = { hour: 0, min: 0 };
    }
    this.tempValue = JSON.parse(JSON.stringify(this.activeTime));
    this.cd.markForCheck();
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.value$.unsubscribe();
  }
}
