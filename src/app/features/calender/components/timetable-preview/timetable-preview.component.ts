import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import {
  SpecialPeriod,
  Day,
  TimetableModel
} from 'src/app/shared/components/timetable/timetable.interface';
import { CalendarModel } from './calendar.interface';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { min } from 'moment';
import { datePickerModule } from 'src/app/shared/components/form-components/datepicker/datepicker.module';
@Component({
  selector: 'edu-timetable-preview',
  templateUrl: './timetable-preview.component.html',
  styleUrls: ['./timetable-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetablePreviewComponent implements OnInit {
  constructor() {}
  day = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  time = [];
  model = {};
  specialPeriods = [];
  ngOnInit(): void {
    this.elValue = testData;
    this.setTime();
    this.setSpecialPeriod();
    console.log('testData');
    console.log(testData);

    console.log('this.time');
    console.log(this.time);
    console.log(this.model);
    console.log('this.tempSpecialPeriod');
    console.log(this.tempSpecialPeriod);
    console.log('this.specialPeriod');
    console.log(this.specialPeriods);
    console.log('specialPeriods2');
    console.log(specialPeriods2);
  }
  @Input('edu-value') set elValue(val: CalendarModel[]) {
    this.parseElValue(val);
  }
  tempSpecialPeriod: tempSpecialPeriodModel[] = [];
  tempTimeArr = [];
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
    }

    return hr + min;
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

  addToTempSpecialPeriod(time, day, text) {
    let specialPeriodDetails: tempSpecialPeriodModel = { time, day, text };
    this.tempSpecialPeriod.push(specialPeriodDetails);
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
        this.addToTempSpecialPeriod(currentPeriodEndTime, day, 'break');

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
    // time: '9:45',
    // text: 'break',
    // color: '#F2B269',
    // start: Day.mon,
    // end: Day.sat
    let specialPeriodTimes = [];
    let tempArr2 = [];
    this.specialPeriods = [];

    this.tempSpecialPeriod.forEach((_sp, index) => {
      if (specialPeriodTimes.indexOf(_sp.time) == -1) {
        specialPeriodTimes.push(_sp.time);
      }
    });
    specialPeriodTimes.forEach(time => {
      let daysActive = [];
      let text = [];
      this.tempSpecialPeriod.forEach((_sp, index) => {
        if (_sp.time === time) {
          daysActive.push(_sp.day);
          text.push(_sp.text);
        }
      });
      let specialPeriod = this.parseSpecialPeriodObj(time, text[0], daysActive);
      this.specialPeriods = [...this.specialPeriods, ...specialPeriod];

      tempArr2.push({
        time,
        text: text[0],
        daysActive
      });
    });
  }

  parseSpecialPeriodObj(time, text, days: string[]) {
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
          color: '#F2B269'
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
  }

  parseElValue(val: CalendarModel[]) {
    //set time,specialPeriod, model

    val.forEach((dayData, index) => {
      let totalBreakTime = 0;
      if (this.day.indexOf(dayData.day.toLowerCase()) > -1) {
        //add starting time of first period
        let firstPeriodStartTime;

        if (dayData.periods.length > 0) {
          // console.log('parsing first period start' + dayData.startTime);
          firstPeriodStartTime = this.parseTimeToInt(dayData.startTime);

          this.addToTempTimeArr(firstPeriodStartTime);
        }

        //reseting model for this particular day
        this.model[dayData.day] = [];
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
        });
      }
    });
  }
}

interface tempSpecialPeriodModel {
  time: string;
  text: string;
  day: string;
}
interface BreakModel {
  firstBreak: string;
  day: string;
  after: string;
  duration: string;
}
let testData: CalendarModel[] = [
  {
    day: 'Mon',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '08:30',
    breaks: [
      {
        firstBreak: '',
        day: '',
        after: 'P1',
        duration: '30'
      },
      {
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '30'
      }
    ],
    assembly: { name: 'assembly', startingAt: '08:30', duration: '' }
  },
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '08:30',
    breaks: [
      {
        firstBreak: '',
        day: '',
        after: 'P1',
        duration: '30'
      },
      {
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '30'
      }
    ],
    assembly: { name: 'assembly', startingAt: '08:30', duration: '' }
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '08:30',
    breaks: [],
    assembly: { name: 'assembly', startingAt: '08:30', duration: '' }
  },
  {
    day: 'Thu',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '08:30',
    breaks: [
      {
        firstBreak: '',
        day: '',
        after: 'P1',
        duration: '30'
      },
      {
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '30'
      }
    ],
    assembly: { name: 'assembly', startingAt: '08:30', duration: '' }
  },
  {
    day: 'Fri',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '08:30',
    breaks: [
      {
        firstBreak: '',
        day: '',
        after: 'P1',
        duration: '30'
      },
      {
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '30'
      }
    ],
    assembly: { name: 'assembly', startingAt: '08:30', duration: '' }
  },
  ,
  {
    day: 'Sat',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '08:30',
    breaks: [
      {
        firstBreak: '',
        day: '',
        after: 'P1',
        duration: '30'
      },
      {
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '30'
      }
    ],
    assembly: { name: 'assembly', startingAt: '08:30', duration: '' }
  }
];

const specialPeriods2 = [
  //time has to be exactly the same as the time declared above as the main comp determines placing by matching the strings
  //color MUST be hex
  {
    //for empty block
    time: '8:00',
    text: '',
    start: Day.wed,
    end: Day.wed
  },
  {
    time: '9:45',
    text: 'break',
    color: '#F2B269',
    start: Day.mon,
    end: Day.sat
  },
  {
    time: '7:45',
    text: 'Assembly',
    color: '#69a9f2',
    start: Day.mon,
    end: Day.sat
  },
  {
    time: '11:45',
    text: 'break',
    color: '#F2B269',
    start: Day.mon,
    end: Day.mon
  },
  {
    time: '11:45',
    text: 'break',
    color: '#F2B269',
    start: Day.thu,
    end: Day.sat
  },
  {
    time: '10:00',
    text: 'break',
    color: '#F2B269',
    start: Day.wed,
    end: Day.wed
  },
  {
    time: '11:00',
    text: 'break',
    color: '#F2B269',
    start: Day.wed,
    end: Day.wed
  }
];
