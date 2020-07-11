import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Renderer2,
  ChangeDetectorRef,
  ViewChildren,
  QueryList,
  ElementRef,
  ComponentRef
} from '@angular/core';
import {
  CalendarModel,
  blankPeriod,
  tempSpecialPeriodModel,
  AssemblyModel,
  BreakModel
} from './data';
import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  copyArrayItem
} from '@angular/cdk/drag-drop';
import { TimetableFacadeService } from '../../services/timetable-facade.service';
import { take, delay } from 'rxjs/operators';
import {
  Overlay,
  OverlayPositionBuilder,
  OverlayRef
} from '@angular/cdk/overlay';
import { SharedTooltipComponent } from 'src/app/shared/components/tooltip/tooltip.component';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  selector: 'edu-custom-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetableComponent implements OnInit {
  periodDurationDefined = false;
  tempSpecialPeriod: tempSpecialPeriodModel[] = [];
  specialPeriodIDarr = [];
  tempTimeArr = [];

  time = [];
  specialPeriods: any = [];
  model: any = {};
  private timetableData;
  @ViewChildren(CdkDropList) droplists: QueryList<CdkDropList>;
  @Input() periodsDataRef: any;
  @Input() selectedClass: string;
  @Input() set selectedSection(value: string) {
    // Update periodsDataRef with data from Store
    this.updateDataRefFromStore();
  }
  // tslint:disable-next-line: no-input-rename
  @Input('edu-title') titleText = '';
  @Input('edu-value') set elValue(val: CalendarModel[]) {
    // console.log('SETTING EL VALUE for - ' + this.titleText);
    // console.log(val);
    this.resetMainValues();
    const cleanData = val;
    this.setDays(cleanData);
    this.parseElValue(cleanData);
    this.setTime();
    this.addBlankToStartOfClass(cleanData);
    // this.addBlanks(val);
    this.setSpecialPeriod();

    // this.logStuff();

    // this.cd.markForCheck();

    // this.logStuff();
  }

  days = [];
  periodDurationIsSet = false;
  private overlayRef: OverlayRef;
  constructor(
    private render: Renderer2,
    private timetableFacade: TimetableFacadeService,
    private cdr: ChangeDetectorRef,
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder
  ) {}

  ngOnInit(): void {
    // this.elValue = fromData.newState;
    // console.log(this.periodsDataRef);
  }

  updateDataRefFromStore() {
    // Update periodsDataRef with data from Store
    this.timetableFacade.timetableData$
      .pipe(delay(100), take(1))
      .subscribe(data => {
        this.timetableData = data;
        const dataKeysFromStore = Object.keys(data);
        dataKeysFromStore.forEach(key => {
          const d = data[key].data;
          this.periodsDataRef[key] = [...d];
        });
        this.cdr.markForCheck();
      });
  }

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
    hr = Number.isNaN(hr) ? 0 : hr;
    min = Number.isNaN(min) ? 0 : min;
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

  setDays(values: CalendarModel[]) {
    let AllPossibleDays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    AllPossibleDays.forEach(activeDay => {
      let filteredValues = values.filter(
        value => value.day.toLowerCase() === activeDay
      );
      // console.log(filteredValues);
      if (filteredValues.length > 0) {
        this.days.push(activeDay);
      }
    });
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
    // let day = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    let day = this.days;
    // console.log(day);
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
    if (assembly.startingAt && assembly.startingAt.length > 0) {
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
    // let day = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    let day = this.days;
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

  createOverlayRef(el: ElementRef) {
    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(el)
      .withPositions([
        {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom',
          offsetY: -12
        }
      ]);

    this.overlayRef = this.overlay.create({ positionStrategy });
  }

  drop(event: CdkDragDrop<any[]>, ...periodData: string[]) {
    if (event.item.data.type === 'teacher') {
      const isAvailable = this.isTeacherAvailable(
        event.item.data.item,
        periodData
      );
      if (!isAvailable) {
        // cancel Drop event if teacher is not available
        // show notification here
        setTimeout(() => {
          this.createOverlayRef(event.item.element);
          this.overlayRef.detach();
          const tooltipRef: ComponentRef<SharedTooltipComponent> = this.overlayRef.attach(
            new ComponentPortal(SharedTooltipComponent)
          );
          tooltipRef.instance.text =
            'This teacher is teaching already at selected time';
          setTimeout(() => {
            this.overlayRef.detach();
          }, 2000);
        }, 80);
        return false;
      }
    }
    if (event.item.data.sourcePeriod) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    event.container.data.forEach(item => {
      const type = item.title ? 'subject' : 'teacher';
      this.render.addClass(
        event.container.element.nativeElement,
        `has-${type}`
      );
    });

    const updatePeriodData = this.getUpdatePeriodData(
      event.container.data,
      periodData
    );

    this.timetableFacade.updateTimetableData(updatePeriodData);

    this.render.removeClass(
      event.previousContainer.element.nativeElement,
      `has-${event.item.data.type}`
    );
  }

  getUpdatePeriodData(container: any[], periodData: string[]) {
    const [value, startTime, endTime, periodKey] = periodData;
    const teacherSubject = {} as any;
    container.forEach(item => {
      const type = item.title ? 'subject' : 'teacher';
      teacherSubject[type] = item;
    });
    const [classId, sectionId, periodId] = value.split('--');
    return {
      classId,
      sectionId,
      periodId,
      period: {
        id: periodId,
        startTime,
        endTime,
        periodKey
      },
      data: [...container]
    };
  }

  subjAndTeacherOnly(item: CdkDrag, drop: CdkDropList<any>) {
    const res =
      ['teacher', 'subject'].includes(item.data.type) &&
      !drop.data.find(el =>
        this.objectIsEqual(Object.keys(el), Object.keys(item.data.item))
      ) &&
      this.teacherInSubject(drop.data, item.data) &&
      this.subjectInTeacher(drop.data, item.data);
    return res;
  }

  isTeacherAvailable(teacher: any, periodData: string[]) {
    const [value, startTime, endTime, periodKey] = periodData;
    let res = true;
    for (const key in this.timetableData) {
      if (this.timetableData.hasOwnProperty(key)) {
        const { period, data } = this.timetableData[key];
        const existingTeacher = data.find(
          el => el.profileId === teacher.profileId
        );
        if (
          existingTeacher &&
          period.periodKey === periodKey &&
          period.startTime <= startTime &&
          period.endTime >= endTime
        ) {
          res = false;
          break;
        }
      }
    }
    return res;
  }

  teacherInSubject(data: any[], item: any) {
    if (item.type === 'teacher') {
      if (data.length === 0) {
        return true;
      }
      const subject = data.find(s => {
        return s.teacherIds && s.teacherIds.includes(item.item.profileId);
      });
      return Boolean(subject);
    }
    return true;
  }

  subjectInTeacher(data: any[], item: any) {
    if (item.type === 'subject') {
      if (data.length === 0) {
        return true;
      }
      const teacher = data.find(
        s => s.subjRefId && s.subjRefId.includes(item.item.id)
      );
      return Boolean(teacher);
    }
    return true;
  }

  objectIsEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  onRemoveFromTimetable(items: any[], index: number, ...periodData: string[]) {
    console.log(this.droplists);
    items.splice(index, 1);
    const updatePeriodData = this.getUpdatePeriodData(items, periodData);

    this.timetableFacade.updateTimetableData(updatePeriodData);
    this.droplists.forEach(droplist => {
      this.render.removeClass(droplist.element.nativeElement, `has-teacher`);
      this.render.removeClass(droplist.element.nativeElement, `has-subject`);
      droplist.data.forEach(item => {
        const type = item.title ? 'subject' : 'teacher';
        this.render.addClass(droplist.element.nativeElement, `has-${type}`);
      });
    });

    this.updateDataRefFromStore();
  }
}
