import {
  Component,
  OnInit,
  AfterContentInit,
  ChangeDetectionStrategy,
  Input,
  ContentChild,
  TemplateRef,
  ElementRef
} from '@angular/core';
import {
  SpecialPeriod,
  Day,
  TimetableModel,
  Time
} from './timetable.interface';
import { TimetableService2 } from './timetable2.service';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'edu-timetable2',
  templateUrl: './timetable2.component.html',
  styleUrls: ['./timetable2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetableComponent2 implements OnInit {
  _model;
  @Input() periodDurationDefined;
  @Input() set model(_model: TimetableModel) {
    this._model = _model;
    if (this.initHookHasPassed) {
      this.setDays();
    }
  }
  get model() {
    return this._model;
  }
  _time;
  @Input() set time(_time: Time[]) {
    this._time = _time;
    this.timeNotDefined = _time.length == 0;
    console.log('timeNotDefined', this.timeNotDefined, _time);
    if (this.initHookHasPassed) {
      this.timeClasses = new Array(this.time.length).fill([]);
      this.timeStyles = new Array(this.time.length).fill({});
      this.setTimeFormatting();
    }
  } //has to be defined in ascending order
  get time() {
    return this._time;
  }
  _specialPeriods;
  @Input() set specialPeriods(val: SpecialPeriod[]) {
    // console.log('setter');
    // console.log(val);
    this._specialPeriods = val;

    if (this.initHookHasPassed) {
      this.SpecialPeriodClasses = new Array(this.specialPeriods.length).fill(
        []
      );
      this.SpecialPeriodStyles = new Array(this.specialPeriods.length).fill({});
      // console.log(val);
      this.initSpecialPeriods();
    }
  }
  get specialPeriods() {
    return this._specialPeriods;
  }
  @Input() specialPeriodHeight: number = 1;

  @ContentChild('periodTemplate') periodTemplate: TemplateRef<any>;
  constructor(private timeTableService: TimetableService2) {}

  timeNotDefined = true;
  timeClasses = [];
  timeStyles = [];
  SpecialPeriodClasses = [];
  SpecialPeriodStyles = [];
  days = [];

  value = {};
  initHookHasPassed = false;
  ngOnInit(): void {
    // console.log('init');
    this.timeClasses = new Array(this.time.length).fill([]);
    this.timeStyles = new Array(this.time.length).fill({});
    this.SpecialPeriodClasses = new Array(this.specialPeriods.length).fill([]);
    this.SpecialPeriodStyles = new Array(this.specialPeriods.length).fill({});

    //file init neeed to be in this order, days> time format, special period
    this.setDays();
    this.setTimeFormatting();
    this.initSpecialPeriods();
    // console.log('initSpecialPeriods');
    this.value = JSON.parse(JSON.stringify(this.model));

    this.timeTableService.$model.pipe(skip(1)).subscribe(({ key, value }) => {
      // console.log(`k ${key}, v ${value}`);
      this.updateModel(key, value);
      // console.log(this.model);
    });

    this.initHookHasPassed = true;
  }

  // ngAfterContentInit() {
  //   // console.log(this.SpecialPeriodClasses);
  //   // console.log(this.specialPeriods);
  // }

  updateModel(k, v) {
    Object.keys(this.model).forEach(day => {
      this.model[day].forEach((period, index) => {
        if (period.key == k) {
          this.model[day][index].value = v;
          return;
        }
      });
    });
  }

  onChange(key, value) {
    // console.log(`key ${key} - value ${value}`);
    // console.log(`key ${key} - value ${value} - parentScope ${this.parentContextVar}`);
  }

  setDays() {
    this.days = [...Object.keys(this.model)];
    // console.log(this.days);
  }

  setTimeFormatting() {
    let classToAdd = 'single-row';
    this.time.map((time, index) => {
      let classDoesntExist = this.timeClasses[index].indexOf(classToAdd) == -1;
      if (time.isSingleRow && classDoesntExist) {
        this.timeClasses[index] = [...this.timeClasses[index], classToAdd];
      }

      //checking for color
      if (time.isSingleRow) {
        let style = {};
        this.specialPeriods.map((_sp, i) => {
          if (_sp.startTime == time.value && _sp.color != undefined) {
            style = { color: _sp.color };
          }
        });
        this.timeStyles[index] = style;
      }
    });
    // console.log(this.timeStyles);
  }
  setColumn(index) {
    return `c${index + 1}`;
  }

  setRowStart(time) {
    if (this.periodDurationDefined) {
      let rowIndex = this.getRowIndex(time);
      return `r${rowIndex * 2 + 1}`;
    }
    return ``;
  }
  setRowEnd(time) {
    if (this.periodDurationDefined) {
      let rowIndex = this.getRowIndex(time);
      return `re${rowIndex * 2}`;
    }
    return `dual-row`;
  }

  initSpecialPeriods() {
    let lowerCaseDays = this.days.map(day => day.toLowerCase());
    this.specialPeriods.forEach((_sp, i) => {
      // console.log(this.getRowIndex(_sp.startTime));
      let rowStart =
        this.getSpecialPeriodRow(_sp.startTime, _sp.inFirstHalf) - 1;
      let rowEnd = this.getSpecialPeriodRow(_sp.endTime, _sp.inFirstHalf) - 1;

      let periodNotSet = _sp.text == '' && _sp.startTime === _sp.endTime;
      // console.log(_sp);
      // console.log(rowStart);
      if (periodNotSet) {
        // console.log('NOT SET!');
        this.SpecialPeriodClasses[i] = this.assignToClassArr(
          this.SpecialPeriodClasses[i],
          `r${rowStart}`
        );
        this.SpecialPeriodClasses[i] = this.assignToClassArr(
          this.SpecialPeriodClasses[i],
          `dual-row`
        );
      } else {
        this.SpecialPeriodClasses[i] = this.assignToClassArr(
          this.SpecialPeriodClasses[i],
          `r${rowStart}`
        );
        this.SpecialPeriodClasses[i] = this.assignToClassArr(
          this.SpecialPeriodClasses[i],
          `re${rowEnd - 1}`
        );
      }

      this.SpecialPeriodClasses[i] = this.assignToClassArr(
        this.SpecialPeriodClasses[i],
        `c${lowerCaseDays.indexOf(_sp.start) + 1}`
      );
      // console.log(`${lowerCaseDays.indexOf(_sp.start) + 1}`);
      this.SpecialPeriodClasses[i] = this.assignToClassArr(
        this.SpecialPeriodClasses[i],
        `ce${lowerCaseDays.indexOf(_sp.end) + 1}`
      );

      this.setSpecialPeriodColor(_sp, i);
    });
  }

  assignToClassArr(arr, classToAdd) {
    return [...arr, classToAdd];
  }

  setSpecialPeriodColor(period: SpecialPeriod, index: number) {
    if (period.color == undefined) {
      return;
    }
    let rgb = this.hexToRgb(period.color);
    let background = `rgba( ${rgb.r}, ${rgb.g}, ${rgb.b} ,0.1)`;

    let styles = {
      color: period.color,
      background
    };
    this.SpecialPeriodStyles[index] = styles;
    // period.color = style;
  }

  hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }

  getRowIndex(_time) {
    // console.log(_time);
    let res = -1;
    this.time.forEach(({ value }, index) => {
      if (value == _time) {
        res = index;
        return index;
      }
    });
    return res;
  }

  getSpecialPeriodRow(_time: string, isInFirstHalf: boolean) {
    let rowCount = 0;
    let count = 0;

    let timeIndex = -1;
    this.time.map((time, index) => {
      if (time.value == _time) {
        timeIndex = index;
      }
    });

    while (count <= timeIndex) {
      if (this.timeClasses[count].indexOf('single-row') == -1) {
        rowCount += 2;
      } else {
        rowCount += 1;
      }
      count += 1;
    }

    if (isInFirstHalf != undefined && isInFirstHalf) {
      rowCount -= 1;
    }
    return rowCount;
  }
}
