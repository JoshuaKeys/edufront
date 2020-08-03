import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  Renderer2,
  ElementRef,
  AfterViewInit
} from '@angular/core';

import {
  CalendarModel,
  blankPeriod,
  tempSpecialPeriodModel,
  AssemblyModel,
  BreakModel
} from '../timetable-preview2/data';
import { Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'edu-timetable-card',
  templateUrl: './timetable-card.component.html',
  styleUrls: ['./timetable-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetableCardComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  color = `#69A9F2`;
  _indexInParent = 0;
  @Input('indexInParent') set indexInParent(param) {
    let colorArr = ['#69A9F2', '#8787F6', '#00DCE8'];
    this.color = colorArr[param % colorArr.length];
    this.renderer.setStyle(this.el.nativeElement, 'border-color', this.color);
    this._indexInParent = param;
  }
  get indexInParent() {
    return this._indexInParent;
  }
  periodDurationDefined = false;
  tempSpecialPeriod: tempSpecialPeriodModel[] = [];
  tempTimeArr = [];

  time = [];
  specialPeriods = [];
  model = {};
  @Output('edu-edit') editClickEvent = new EventEmitter();
  @Output('edu-tick') tickClickEvent = new EventEmitter();
  @Input('edu-title') eduTitle;
  @Input('edu-id') eduId;
  _elValue;
  @Input('edu-value') set elValue(val: CalendarModel[]) {
    // console.log('SETTING EL VALUE');
    this._elValue = val;
    this.setValue(val);
    // this.logStuff();

    // this.cd.markForCheck();

    // this.logStuff();
  }
  get elValue() {
    return this._elValue;
  }

  isAfterViewInit = false;

  removeDaysWithEmptyPeriod(val: CalendarModel[]) {
    return val.filter(_val => _val.periods.length > 0);
  }
  periodDurationIsSet = false;
  tickClick() {
    this.tickClickEvent.emit(this.eduId);
  }
  editClick() {
    this.editClickEvent.emit(this.eduId);
  }
  resetMainValues() {
    this.time = [];
    this.specialPeriods = [];
    this.model = {};

    this.tempTimeArr = [];
    this.tempSpecialPeriod = [];
  }

  logStuff() {
    console.log('this.tempTimeArr');
    console.log(this.tempTimeArr);
    console.log('this.time');
    console.log(this.time);
    console.log(this.model);
    console.log('this.tempSpecialPeriod');
    console.log(this.tempSpecialPeriod);
    console.log('this.specialPeriod');
    console.log(this.specialPeriods);
  }

  setValue(val) {
    this.resetMainValues();
    let cleanValues = this.removeDaysWithEmptyPeriod(val);
    this.parseElValue(cleanValues);
    this.setTime();
    this.addBlankToStartOfClass(cleanValues);
    this.setSpecialPeriod();
  }

  addToTempTimeArr(time: number) {
    if (Number.isNaN(time)) {
      return;
    }
    if (this.tempTimeArr.indexOf(time) == -1) {
      this.tempTimeArr.push(time);
    }
  }
  parseTimeToMin(inputTime: number) {
    return Math.floor(inputTime / 100) * 60 + (inputTime % 100);
  }

  parseTimeToInt(inputTimeString: string) {
    let indexOfColon = inputTimeString.indexOf(':');
    let hr = 0;
    let min = 0;
    if (indexOfColon !== -1) {
      hr = parseInt(inputTimeString.substring(0, indexOfColon)) * 100;
      min = parseInt(
        inputTimeString.substring(indexOfColon + 1, inputTimeString.length)
      );
    } else {
      min = parseInt(inputTimeString);
      min = min > 60 ? this.convertMinsToTime(min) : min;
    }

    return hr + min;
  }

  timeDifferenceInMins(time1: number, time2: number) {
    //get duration in mins
    let min1 = time1 % 100;
    let min2 = time2 % 100;
    let h1 = time1 - min1;
    let h2 = time2 - min2;

    let res = (h1 / 100) * 60 - (h2 / 100) * 60 + min1 - min2;

    console.log(res);

    return res;
  }

  addBlankToStartOfClass(val: CalendarModel[]) {
    if (this.periodDurationIsSet) {
      return;
    }

    let startTimeArr: blankPeriod[] = [];
    let tempTimeArr = [];
    let periodDuration = 0;
    val.forEach(val => {
      if (tempTimeArr.indexOf(val.startTime) == -1) {
        let startTime = val.startTime;
        let startTimeInt = this.parseTimeToInt(startTime);
        periodDuration = this.parseTimeToInt(val.periodDuration);
        tempTimeArr.push(startTime);
        startTimeArr.push({ startTime, blankPeriod: 0, startTimeInt });
      }
    });
    let earliestStartTime = JSON.parse(JSON.stringify(startTimeArr));
    earliestStartTime.reduce((a, b) => {
      return a.startTimeInt > b.startTimeInt ? b : a;
    });
    earliestStartTime.sort((a, b) => a.startTimeInt - b.startTimeInt);
    earliestStartTime = earliestStartTime[0].startTimeInt;
    let indexOfEarliestStartTime = this.tempTimeArr.indexOf(earliestStartTime);
    val
      .filter(dayData => {
        let res = false;
        startTimeArr.forEach(startTime => {
          if (startTime.startTime === dayData.startTime) {
            res = true;
            return true;
          }
        });
        return res;
      })
      .map(dayData => {
        let startTimeInInt = this.parseTimeToInt(dayData.startTime);
        let indexOfCurrentTime = this.tempTimeArr.indexOf(startTimeInInt);
        let noOfBlanks = indexOfCurrentTime - indexOfEarliestStartTime;
        for (let i = 0; i < noOfBlanks; i++) {
          let time = this.tempTimeArr[indexOfEarliestStartTime + i];
          this.addToTempSpecialPeriod(time, time, dayData.day, '', null);
        }
      });
  }

  addTime(time1: number, time2: number) {
    let min1 = time1 % 100;
    let min2 = time2 % 100;
    let h1 = time1 - min1;
    let h2 = time2 - min2;
    let min1n2 = min1 + min2;
    let res = h1 + h2 + Math.floor(min1n2 / 60) * 100 + (min1n2 % 60);
    return res;
  }
  convertMinsToTime(min) {
    return Math.floor(min / 60) * 100 + (min % 60);
  }

  addToTempSpecialPeriod(
    startTime,
    endTime,
    day,
    text,
    color: string = '#F2B269'
  ) {
    let specialPeriodDetails: tempSpecialPeriodModel = {
      startTime,
      endTime,
      day,
      text,
      color
    };
    if (color == null) {
      delete specialPeriodDetails.color;
    }
    this.addToTempTimeArr(startTime);
    this.addToTempTimeArr(endTime);
    this.tempSpecialPeriod.push(specialPeriodDetails);
  }

  formatTime(time) {
    let m = time % 100;
    let h = Math.floor(time / 100);
    let _h = h < 10 ? `0${h}` : `${h}`;
    let _m = m < 10 ? `0${m}` : `${m}`;
    return `${_h}:${_m}`;
  }

  setTime() {
    let _tempTimeArr = this.tempTimeArr.sort((a, b) => a - b);
    this.time = [];
    _tempTimeArr.forEach(time => {
      let value = `${this.formatTime(time)}`;
      this.time.push({ value });
    });
    if (this.periodDurationIsSet) {
      this.time.splice(-1);
    }
  }

  getSpecialPeriodIdentifier(p) {
    return `st${p.startTime}et${p.endTime}t${p.text}c${p.color}`;
  }

  setBlankBeforeClass() {
    this.specialPeriods = [];
    this.tempSpecialPeriod.forEach(sp => {
      let _sp: any = {
        startTime: this.formatTime(sp.startTime),
        endTime: this.formatTime(sp.endTime),
        start: sp.day.toLowerCase(),
        end: sp.day.toLowerCase(),
        text: ''
      };
      this.specialPeriods.push(_sp);
    });
  }
  setSpecialPeriod() {
    //startTime ,endTime,text,Color all has to be the same

    if (!this.periodDurationIsSet) {
      this.setBlankBeforeClass();
      return;
    }

    let uniqueIdentifierArr = [];
    let specialPeriodValueArr = [];
    let day = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    //filtering out unique special periods across the week
    this.tempSpecialPeriod.forEach((period, periodIndex) => {
      let identifier = this.getSpecialPeriodIdentifier(period);
      if (uniqueIdentifierArr.indexOf(identifier) == -1) {
        uniqueIdentifierArr.push(identifier);
        specialPeriodValueArr.push(period);
      }
    });

    uniqueIdentifierArr.forEach(uid => {
      let hasStarted = false;
      let tempResults = null;
      day.forEach((_day, _dayIndex) => {
        this.tempSpecialPeriod

          .filter(p => {
            let isSameUid = this.getSpecialPeriodIdentifier(p) == uid;
            let isSameDay = p.day.toLocaleLowerCase() == _day;
            return isSameUid && isSameDay;
          })
          .map((p, periodIndex) => {
            // console.log(this.getSpecialPeriodIdentifier(p));
            if (!hasStarted && tempResults == null) {
              // console.log('init');
              tempResults = {
                startTime: this.formatTime(p.startTime),
                endTime: this.formatTime(p.endTime),
                color: p.color,
                text: p.text,
                start: _day.toLowerCase(),
                end: _day.toLowerCase()
              };

              hasStarted = true;
            } else if (tempResults !== null) {
              // console.log('changing the day');
              tempResults.end = _day.toLocaleLowerCase();
            } else {
              // console.log('end');
              this.specialPeriods.push(tempResults);
              tempResults = null;
              hasStarted = false;
            }
          });
      });
      if (tempResults != null) {
        // console.log('PUSHING');

        this.specialPeriods.push(tempResults);
        tempResults = null;
        hasStarted = false;
      }
    });

    // console.log(uniqueIdentifierArr);
    // console.log(specialPeriodValueArr);
  }
  checkForAssembly(assembly: AssemblyModel, day, color: string) {
    if (assembly.startingAt.length > 0) {
      let startTime = this.parseTimeToInt(assembly.startingAt);
      let endTime = this.addTime(
        startTime,
        this.parseTimeToInt(assembly.duration)
      );
      // this.addToTempTimeArr(startTime);
      // this.addToTempTimeArr(endTime);
      this.addToTempSpecialPeriod(
        startTime,
        endTime,
        day,
        assembly.name,
        color
      );
    }
  }
  checkForBreaks(
    currentPeriod,
    currentPeriodEndTime,
    day,
    breaks: BreakModel[]
  ) {
    let breakDuration = 0;
    breaks.forEach((_break, index) => {
      if (_break.after === currentPeriod) {
        breakDuration = this.parseTimeToInt(_break.duration);
        let breakEndTime = this.addTime(currentPeriodEndTime, breakDuration);

        this.addToTempSpecialPeriod(
          currentPeriodEndTime,
          breakEndTime,
          day,
          _break.name
        );

        // this.addToTempTimeArr(breakEndTime);
        breakDuration = this.parseTimeToMin(breakDuration);
        return breakDuration;
      }
    });
    return breakDuration;
  }
  parseElValue(val: CalendarModel[]) {
    //set time,specialPeriod, model
    this.tempTimeArr = [];
    let day = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    val.forEach((dayData, index) => {
      let totalBreakTime = 0;
      if (day.indexOf(dayData.day.toLowerCase()) > -1) {
        //add starting time of first period
        let firstPeriodStartTime;

        if (dayData.periods.length > 0) {
          firstPeriodStartTime = this.parseTimeToInt(dayData.startTime);
          this.addToTempTimeArr(firstPeriodStartTime);
        }

        //reseting model for this particular day
        this.model[dayData.day] = [];

        dayData.periods.forEach((period, periodindex) => {
          let key = `${dayData.day}${periodindex}`;
          let value = period;

          let intervalBtwPeriods = this.parseTimeToMin(
            this.parseTimeToInt(dayData.intervaBtwPeriods)
          );
          let periodDuration = this.parseTimeToMin(
            this.parseTimeToInt(dayData.periodDuration)
          );
          intervalBtwPeriods = periodDuration == 0 ? 0 : intervalBtwPeriods;

          let firstPeriodStartToStartOfCurrentPeriod =
            (periodDuration + intervalBtwPeriods) * periodindex +
            totalBreakTime;
          firstPeriodStartToStartOfCurrentPeriod = this.convertMinsToTime(
            firstPeriodStartToStartOfCurrentPeriod
          );
          // console.log(`[${dayData.day}, (${period})]`);
          // console.log(` periodDuration- ${periodDuration}`);
          // console.log(` intervalBtwPeriods- ${intervalBtwPeriods}`);
          // console.log(`totalBreakTime - ${totalBreakTime}`);

          // console.log(
          //   `firstPeriodStartToStartOfCurrentPeriod - ${firstPeriodStartToStartOfCurrentPeriod}`
          // );
          let startTime = this.addTime(
            firstPeriodStartTime,
            firstPeriodStartToStartOfCurrentPeriod
          );
          let endTime = this.addTime(
            startTime,
            periodDuration + intervalBtwPeriods
          );
          // console.log(`startTime - ${startTime}`);
          // console.log(`endTime - ${endTime}`);
          this.model[dayData.day].push({
            key,
            value,
            startTime: this.formatTime(startTime),
            endTime: this.formatTime(endTime)
          });
          // console.log('endTime - ' + endTime);
          this.addToTempTimeArr(endTime);
          this.periodDurationIsSet =
            this.parseTimeToInt(dayData.periodDuration) > 0;
          if (this.periodDurationIsSet) {
            console.log(`asscolor`, this.indexInParent, this.color);
            this.checkForAssembly(dayData.assembly, dayData.day, this.color);

            let breakDuration = this.checkForBreaks(
              period,
              endTime,
              dayData.day,
              dayData.breaks
            );
            // console.log(`breakDuration - ${breakDuration}`);
            totalBreakTime += breakDuration;
            // console.log(`totalBreakTime - ${totalBreakTime}`);
          }
        });
      }
    });
  }
}
