import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input
} from '@angular/core';

import {
  CalendarModel,
  blankPeriod,
  tempSpecialPeriodModel,
  AssemblyModel,
  BreakModel
} from './data';
import * as fromData from './data';
import { Output, EventEmitter, HostListener } from '@angular/core';
@Component({
  selector: 'edu-timetable-preview',
  templateUrl: './timetable-preview2.component.html',
  styleUrls: ['./timetable-preview2.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetablePreview2Component implements OnInit {
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    // this.elValue = fromData.newState;
  }
  periodDurationDefined = false;
  tempSpecialPeriod: tempSpecialPeriodModel[] = [];
  specialPeriodIDarr = [];
  tempTimeArr = [];

  time = [];
  specialPeriods: any = [];
  model: any = {};
  @Input('edu-title') titleText = '';
  @Input('edu-value') set elValue(val: CalendarModel[]) {
    // console.log('SETTING EL VALUE for - ' + this.titleText);
    // console.log(val);
    this.resetMainValues();
    let cleanData = this.removeDaysWithEmptyPeriod(val);

    this.parseElValue(cleanData);
    this.setTime();
    this.addBlankToStartOfClass(cleanData);
    // this.addBlanks(val);
    this.setSpecialPeriod();

    // this.logStuff();

    // this.cd.markForCheck();

    // this.logStuff();
  }

  periodDurationIsSet = false;
  removeDaysWithEmptyPeriod(val: CalendarModel[]) {
    return val.filter(_val => _val.periods.length > 0);
  }
  resetMainValues() {
    this.time = [];
    this.specialPeriods = [];
    this.model = {};

    this.tempTimeArr = [];
    this.tempSpecialPeriod = [];
    this.specialPeriodIDarr = [];
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

  addToTempTimeArr(time: number) {
    if (Number.isNaN(time) || time == undefined) {
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

    // console.log(res);

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
        let isValidTime = !Number.isNaN(startTimeInt);
        periodDuration = this.parseTimeToInt(val.periodDuration);
        if (isValidTime) {
          tempTimeArr.push(startTime);
          startTimeArr.push({ startTime, blankPeriod: 0, startTimeInt });
        }
      }
    });
    console.log(startTimeArr);
    console.log(this.tempTimeArr);
    let earliestStartTime = JSON.parse(JSON.stringify(startTimeArr));

    earliestStartTime.reduce((a, b) => {
      return a.startTimeInt > b.startTimeInt ? b : a;
    });
    earliestStartTime.sort((a, b) => a.startTimeInt - b.startTimeInt);
    earliestStartTime = earliestStartTime[0].startTimeInt;
    let indexOfEarliestStartTime = this.tempTimeArr.indexOf(earliestStartTime);

    console.log('indexOfEarliestStartTime ' + indexOfEarliestStartTime);

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
        console.log(noOfBlanks);
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
    let uid = `st${startTime}et${endTime}day${day.toLowerCase()}tx${text}col${color}`;
    if (this.specialPeriodIDarr.indexOf(uid) != -1) {
      return;
    }
    // console.log(uid);
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
    this.specialPeriodIDarr.push(uid);
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
      let prevDayIndex = 0;
      day.forEach((_day, _dayIndex) => {
        this.tempSpecialPeriod

          .filter(p => {
            let isSameUid = this.getSpecialPeriodIdentifier(p) == uid;
            let isSameDay = p.day.toLocaleLowerCase() == _day;
            return isSameUid && isSameDay;
          })
          .map((p, periodIndex) => {
            // console.log(`prevDayIndex ${prevDayIndex} _dayIndex ${_dayIndex}`);

            if (_dayIndex - prevDayIndex > 1 && tempResults !== null) {
              this.specialPeriods.push(tempResults);
              tempResults = null;
              hasStarted = false;
            }

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
              prevDayIndex = _dayIndex;
              hasStarted = true;
            } else if (tempResults !== null) {
              // console.log('changing the day');
              tempResults.end = _day.toLocaleLowerCase();
              prevDayIndex = _dayIndex;
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

        if (dayData.periods.length > 0 && dayData.startTime != '0') {
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
            this.checkForAssembly(dayData.assembly, dayData.day, '#69A9F2');

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
