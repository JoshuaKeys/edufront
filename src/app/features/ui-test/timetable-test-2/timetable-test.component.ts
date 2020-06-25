import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input
} from '@angular/core';
import {
  SpecialPeriod,
  Day,
  TimetableModel
} from '../../../shared/components/timetable/timetable.interface';
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
  selector: 'edu-timetable-test2',
  templateUrl: './timetable-test.component.html',
  styleUrls: ['./timetable-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeTableTestComponent2 implements OnInit {
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.elValue = fromData.newState;
  }

  day = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  tempSpecialPeriod: tempSpecialPeriodModel[] = [];
  tempTimeArr = [];

  time = [];
  specialPeriods: SpecialPeriod[] = [];
  model: TimetableModel = {};

  @Input('edu-value') set elValue(val: CalendarModel[]) {
    // console.log('SETTING EL VALUE');
    this.resetMainValues();

    this.parseElValue(val);
    this.setTime();
    this.addBlankToStartOfClass(val);
    this.addBlanks(val);
    this.logStuff();
    this.setSpecialPeriod();

    // this.cd.markForCheck();

    // this.logStuff();
  }

  periodDurationIsSet = false;

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

  addToTempTimeArr(time: number) {
    if (Number.isNaN(time)) {
      return;
    }
    if (this.tempTimeArr.indexOf(time) == -1) {
      this.tempTimeArr.push(time);
    }
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

  convertBlankAtStartToSpecialPeriod(
    startTimeArr: blankPeriod[],
    val: CalendarModel[]
  ) {
    val.forEach((val, index) => {
      let blankPeriod: any = startTimeArr.filter(
        startTime => startTime.startTime === val.startTime
      );
      blankPeriod = blankPeriod[0].blankPeriod;
      for (let i = 0; i < blankPeriod; i++) {
        this.addToTempSpecialPeriod(
          startTimeArr[i].startTimeInt,
          val.day,
          '',
          null
        );
      }
    });
  }
  addBlanks(val: CalendarModel[]) {
    val.forEach(dayData => {
      let breaks = dayData.breaks;
      let dayStartTime = this.parseTimeToInt(dayData.startTime);
      let periodDuration = this.parseTimeToInt(dayData.periodDuration);
      let intervaBtwPeriods = this.parseTimeToInt(dayData.intervaBtwPeriods);
      let totalBreakTime = 0;
      let blankPeriodBtwStartAndEnd = 0;
      let prevStartTime = 0;

      dayData.periods.forEach((period, index) => {
        let currentPeriodStartTime = this.addTime(
          this.convertMinsToTime(
            (intervaBtwPeriods + periodDuration) * index + totalBreakTime
          ),
          dayStartTime
        );
        let currentPeriodEndTime = this.addTime(
          this.convertMinsToTime(
            (intervaBtwPeriods + periodDuration) * (index + 1) + totalBreakTime
          ),
          dayStartTime
        );

        // console.log(
        //   `[${dayData.day} ,  ${period}] - adding blanks (${blankPeriodBtwStartAndEnd})`
        // );

        if (index > 0) {
          for (let i = 0; i < blankPeriodBtwStartAndEnd; i++) {
            // console.log('addblank prevStartTime - ' + prevStartTime);
            let indexOfPrevTime = this.tempTimeArr.indexOf(prevStartTime);
            // console.log('addblank indexOfPrevTime - ' + indexOfPrevTime);
            let timeToAddBlank = this.tempTimeArr[indexOfPrevTime + i + 1];
            // console.log('addblank timeToAddBlank - ' + timeToAddBlank);
            this.addToTempSpecialPeriod(timeToAddBlank, dayData.day, '', null);
          }
        }
        //pass to next iteration
        prevStartTime = currentPeriodStartTime;
        // console.log('prevStartTime - ' + prevStartTime);
        blankPeriodBtwStartAndEnd =
          this.tempTimeArr.indexOf(currentPeriodEndTime) -
          this.tempTimeArr.indexOf(currentPeriodStartTime) -
          1;
        // console.log(
        //   `[${dayData.day} , previously ${period}] - blanks (${blankPeriodBtwStartAndEnd})`
        // );
        breaks
          .filter(_break => _break.after == period)
          .map(_break => {
            let breakDuration = this.parseTimeToInt(_break.duration);
            let breakStartTime = currentPeriodEndTime;
            let breakEndTime = this.addTime(breakStartTime, breakDuration);
            let blankPeriods =
              this.tempTimeArr.indexOf(breakEndTime) -
              this.tempTimeArr.indexOf(breakStartTime) -
              1;

            for (let i = 0; i < blankPeriodBtwStartAndEnd; i++) {
              // console.log('addblank prevStartTime - ' + prevStartTime);
              let indexOfPrevTime = this.tempTimeArr.indexOf(prevStartTime);
              // console.log('addblank indexOfPrevTime - ' + indexOfPrevTime);
              let timeToAddBlank = this.tempTimeArr[indexOfPrevTime + i + 1];
              // console.log('addblank timeToAddBlank - ' + timeToAddBlank);
              this.addToTempSpecialPeriod(
                timeToAddBlank,
                dayData.day,
                '',
                null
              );
            }
            prevStartTime = breakStartTime;
            // console.log('break prevStartTime - ' + prevStartTime);
            blankPeriodBtwStartAndEnd = blankPeriods;
            // console.log('breakblankPeriods - ' + blankPeriods);
            totalBreakTime += breakDuration;
          });
      });
    });
  }
  addBlankToStartOfClass(val: CalendarModel[]) {
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
    console.log('earliestStartTime');
    console.log(earliestStartTime);
    console.log(startTimeArr);
    // startTimeArr.forEach((element, index) => {
    //   let indexOfCurrentTime = this.tempTimeArr.indexOf(element.startTimeInt);

    //   element.blankPeriod = indexOfCurrentTime - indexOfEarliestStartTime;
    // });

    console.log(startTimeArr);
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
        console.log('noOfBlanks - ' + noOfBlanks);
        for (let i = 0; i < noOfBlanks; i++) {
          let time = this.tempTimeArr[indexOfEarliestStartTime + i];
          console.log('time - ' + time);
          this.addToTempSpecialPeriod(time, dayData.day, '', null);
        }
      });

    // this.convertBlankAtStartToSpecialPeriod(startTimeArr, val);
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

  addToTempSpecialPeriod(time, day, text, color: string = '#F2B269') {
    let specialPeriodDetails: tempSpecialPeriodModel = {
      time,
      day,
      text,
      color
    };
    if (color == null) {
      delete specialPeriodDetails.color;
    }
    this.tempSpecialPeriod.push(specialPeriodDetails);
  }
  checkForAssembly(assembly: AssemblyModel, day, color: string) {
    if (assembly.startingAt.length > 0) {
      let startTime = this.parseTimeToInt(assembly.startingAt);
      this.addToTempTimeArr(startTime);
      this.addToTempSpecialPeriod(startTime, day, assembly.name, color);
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
        this.addToTempSpecialPeriod(currentPeriodEndTime, day, _break.name);

        breakDuration = this.convertMinsToTime(
          this.parseTimeToInt(_break.duration)
        );

        let breakEndTime = this.addTime(currentPeriodEndTime, breakDuration);

        this.addToTempTimeArr(breakEndTime);
        return breakDuration;
      }
    });
    return breakDuration;
  }
  formatTime(time) {
    let m = time % 100;
    let h = Math.floor(time / 100);
    let _h = h < 10 ? `0${h}` : `${h}`;
    let _m = m < 10 ? `0${m}` : `${m}`;
    return `${_h}:${_m}`;
  }

  setSpecialPeriod() {
    let specialPeriodTimes = [];
    let tempArr2 = [];
    this.specialPeriods = [];

    this.tempSpecialPeriod.forEach((_sp, index) => {
      if (specialPeriodTimes.indexOf(_sp.time) == -1) {
        specialPeriodTimes.push(_sp.time);
      }
    });
    // console.log(specialPeriodTimes);
    specialPeriodTimes.forEach(time => {
      let daysActive = [];
      let text = [];
      let color = [];
      this.tempSpecialPeriod.forEach((_sp, index) => {
        if (_sp.time === time) {
          daysActive.push(_sp.day);
          text.push(_sp.text);
          color.push(_sp.color);
        }
      });

      let specialPeriodAtTime = this.parseSpecialPeriodObj(
        time,
        text,
        daysActive,
        color
      );

      this.specialPeriods = [...this.specialPeriods, ...specialPeriodAtTime];

      tempArr2.push({
        time,
        text: text[0],
        daysActive
      });
    });
  }

  parseSpecialPeriodObj(time, text: string[], days: string[], color: string[]) {
    let res = [];
    let isNewPeriod = true;
    let parsedTime = this.formatTime(time);
    let tempPeriodObj = { time, text: '', start: '', end: '', color: '' };
    let lowerCaseDays = days.map(day => day.toLowerCase());
    let prevText = '';
    // console.log(text);
    this.day.forEach((day, index) => {
      let indexOfParam = lowerCaseDays.indexOf(day.toLowerCase());
      let isSameText = index > 0 ? prevText == text[indexOfParam] : false;
      let dayExistOnSpecialPeriod = indexOfParam !== -1;

      if (!isNewPeriod && dayExistOnSpecialPeriod && !isSameText) {
        res.push(JSON.parse(JSON.stringify(tempPeriodObj)));
        isNewPeriod = true;
      }

      if (dayExistOnSpecialPeriod && isNewPeriod) {
        tempPeriodObj = {
          time: parsedTime,
          text: text[indexOfParam],
          start: day.toLowerCase(),
          end: day.toLowerCase(),
          color: color[indexOfParam]
        };
        // console.log(text[index]);
        // console.log(index);
        // console.log(tempPeriodObj);
        isNewPeriod = false;
      } else if (dayExistOnSpecialPeriod && isSameText) {
        // console.log(
        //   'isSameText when dayExistOnSpecialPeriod [' +
        //     day +
        //     '] - ' +
        //     isSameText
        // );
        tempPeriodObj.end = day.toLowerCase();
      } else if (!isNewPeriod) {
        res.push(JSON.parse(JSON.stringify(tempPeriodObj)));
        isNewPeriod = true;
      }
      prevText = indexOfParam != -1 ? text[indexOfParam] : prevText;
    });
    // console.log(res);
    return res;
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

  parseElValue(val: CalendarModel[]) {
    //set time,specialPeriod, model
    this.tempTimeArr = [];

    val.forEach((dayData, index) => {
      let totalBreakTime = 0;
      if (this.day.indexOf(dayData.day.toLowerCase()) > -1) {
        //add starting time of first period
        let firstPeriodStartTime;

        if (dayData.periods.length > 0) {
          firstPeriodStartTime = this.parseTimeToInt(dayData.startTime);
          this.addToTempTimeArr(firstPeriodStartTime);
        }

        //reseting model for this particular day
        this.model[dayData.day] = [];

        this.checkForAssembly(dayData.assembly, dayData.day, '#69A9F2');
        dayData.periods.forEach((period, periodindex) => {
          let key = `${dayData.day}${periodindex}`;
          let value = period;
          this.model[dayData.day].push({ key, value });

          let intervalBetweenPeriods = this.parseTimeToInt(
            dayData.intervaBtwPeriods
          );
          let durationBtnPeriod = this.parseTimeToInt(dayData.periodDuration);
          // console.log(
          //   dayData.day + ' intervalBetweenPeriods - ' + intervalBetweenPeriods
          // );
          let firstPeriodStartToEndOfCurrent =
            (durationBtnPeriod + intervalBetweenPeriods) * (periodindex + 1) +
            totalBreakTime;
          // console.log(
          //   'firstPeriodStartToEndOfCurrent - ' + firstPeriodStartToEndOfCurrent
          // );
          firstPeriodStartToEndOfCurrent = this.convertMinsToTime(
            firstPeriodStartToEndOfCurrent
          );
          // console.log(
          //   'firstPeriodStartToEndOfCurrent in time - ' +
          //     firstPeriodStartToEndOfCurrent
          // );
          let periodEndTime = this.addTime(
            firstPeriodStartTime,
            firstPeriodStartToEndOfCurrent
          );
          // console.log('periodEndTime - ' + periodEndTime);
          this.addToTempTimeArr(periodEndTime);
          let breakTime = this.checkForBreaks(
            period,
            periodEndTime,
            dayData.day,
            dayData.breaks
          );
          totalBreakTime += breakTime;

          this.periodDurationIsSet =
            this.parseTimeToInt(dayData.periodDuration) > 0;
        });
      }
    });
  }
}
