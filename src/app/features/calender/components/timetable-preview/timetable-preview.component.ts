import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef
} from '@angular/core';
import {
  SpecialPeriod,
  Day,
  TimetableModel
} from 'src/app/shared/components/timetable/timetable.interface';
import { CalendarModel } from './calendar.interface';

@Component({
  selector: 'edu-timetable-preview',
  templateUrl: './timetable-preview.component.html',
  styleUrls: ['./timetable-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetablePreviewComponent implements OnInit {
  constructor(private cd: ChangeDetectorRef) {}
  day = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  time = [];
  model = {};
  specialPeriods = [];
  tempSpecialPeriod: tempSpecialPeriodModel[] = [];
  tempTimeArr = [];
  ngOnInit(): void {
    // this.elValue = testData;
    // this.elValue = testData;
  }
  @Input('edu-value') set elValue(val: CalendarModel[]) {
    // console.log('SETTING EL VALUE');
    this.resetMainValues();

    this.parseElValue(val);
    this.setTime();
    this.addBlankToStartOfClass(val);
    this.setSpecialPeriod();

    this.cd.markForCheck();

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
    // console.log('testData');
    // console.log(testData);

    console.log('this.time');
    console.log(this.time);
    console.log(this.model);
    console.log('this.tempSpecialPeriod');
    console.log(this.tempSpecialPeriod);
    console.log('this.specialPeriod');
    console.log(this.specialPeriods);
  }

  addToTempTimeArr(time: number) {
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

  convertBlankToSpecialPeriod(
    startTimeArr: {
      startTime: string;
      blankPeriod: number;
      startTimeInt: number;
    }[],
    val: CalendarModel[]
  ) {
    // console.log('startTimeArr');
    // console.log(startTimeArr);
    val.forEach((val, index) => {
      let blankPeriod: any = startTimeArr.filter(
        startTime => startTime.startTime === val.startTime
      );
      // console.log(blankPeriod);
      blankPeriod = blankPeriod[0].blankPeriod;
      for (let i = 0; i < blankPeriod; i++) {
        // console.log('adding to temp special period');
        this.addToTempSpecialPeriod(
          startTimeArr[i].startTimeInt,
          val.day,
          '',
          null
        );
      }
    });
  }

  addBlankToStartOfClass(val: CalendarModel[]) {
    let startTimeArr = [];
    let tempTimeArr = [];
    let periodDuration = 0;
    val.forEach((val, index) => {
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
    earliestStartTime.forEach((element, index) => {
      element.blankPeriod = index;
    });
    console.log(earliestStartTime);

    //add without considering period duration
    //return;

    this.convertBlankToSpecialPeriod(earliestStartTime, val);
    console.log(this.tempSpecialPeriod);
    console.log(startTimeArr);

    console.log(earliestStartTime);
    console.log('START TIME ARR !!');
    console.log(startTimeArr);
    //check throught all class start time
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
        // console.log(_break.after === currentPeriod);
        // console.log(_break.after);
        // console.log(currentPeriodEndTime);
        this.addToTempSpecialPeriod(currentPeriodEndTime, day, 'break');

        breakDuration = this.convertMinsToTime(
          this.parseTimeToInt(_break.duration)
        );

        let breakEndTime = this.addTime(currentPeriodEndTime, breakDuration);
        // console.log('breakEndTime' + day);
        // console.log(breakEndTime);
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
        text[0],
        daysActive,
        color[0]
      );

      console.log('specialPeriodAtTime');
      console.log(specialPeriodAtTime);
      this.specialPeriods = [...this.specialPeriods, ...specialPeriodAtTime];

      tempArr2.push({
        time,
        text: text[0],
        daysActive
      });
    });
  }

  parseSpecialPeriodObj(time, text, days: string[], color: string) {
    let res = [];
    let isNewPeriod = true;
    let parsedTime = this.formatTime(time);
    let tempPeriodObj = { time, text, start: '', end: '', color: '' };
    let lowerCaseDays = days.map(day => day.toLowerCase());
    this.day.forEach(day => {
      let dayExistOnSpecialPeriod =
        lowerCaseDays.indexOf(day.toLowerCase()) !== -1;
      if (dayExistOnSpecialPeriod && isNewPeriod) {
        tempPeriodObj = {
          time: parsedTime,
          text,
          start: day.toLowerCase(),
          end: day.toLowerCase(),
          color
        };
        isNewPeriod = false;
      } else if (dayExistOnSpecialPeriod) {
        tempPeriodObj.end = day.toLowerCase();
      } else if (!isNewPeriod) {
        res.push(JSON.parse(JSON.stringify(tempPeriodObj)));
        isNewPeriod = true;
      }
    });

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

          let firstPeriodStartToEndOfCurrent =
            this.parseTimeToInt(dayData.periodDuration) * (periodindex + 1) +
            totalBreakTime;
          firstPeriodStartToEndOfCurrent = this.convertMinsToTime(
            firstPeriodStartToEndOfCurrent
          );

          let periodEndTime = this.addTime(
            firstPeriodStartTime,
            firstPeriodStartToEndOfCurrent
          );
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

interface tempSpecialPeriodModel {
  time: string;
  text: string;
  day: string;
  color: string;
}

interface AssemblyModel {
  name: string;
  startingAt: string;
  duration: string;
}
interface BreakModel {
  firstBreak: string;
  day: string;
  after: string;
  duration: string;
}
