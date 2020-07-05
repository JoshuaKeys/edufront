import { Component, OnInit, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ClassModel } from 'src/app/shared/models/class.model';
import { selectAllClasses, selectTeachingDays, selectTeaching } from '../../ngrx/selectors';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { map } from 'rxjs/operators';
import { TeachingDay } from '../../models/teaching-day.model';
import { SelectedPeriodModel } from '../../models/selected-period.model';
import { selectTeachingDay, editCalendar, toggleEditClassActive,setEditAssemblyData,toggleEditTeachingActive, updateCalendarPeriodData, addEditSameBreak, updateEditBreakData, removeEditBreak, setAssemblyEnabledMode, computeModifications, updateEditStartTime } from '../../ngrx/actions/calendar.actions';
import { ClassGroupModel } from '../../models/class-group.model';
import { ActivatedRoute } from '@angular/router';
import { TeachingStateModel } from '../../models/teaching-state.model';

@Component({
  selector: 'edu-update-timetable',
  templateUrl: './update-timetable.component.html',
  styleUrls: ['./update-timetable.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateTimetableComponent implements OnInit {
  allClasses: Observable<ClassModel[]>;
  teachingState: Observable<TeachingStateModel>;
  intervals: { duration: number; text: string }[] = [];
  timeArr = Array(60);
  modalIsActive = false;
  durations: {duration: number; text: string}[] = []
  @ViewChild('scrollableEl') scrollableEl: ElementRef;
  periodDurations = [
    { duration: 10, text: '10 minutes' },
    { duration: 20, text: '20 minutes' },
    { duration: 30, text: '30 minutes' },
    { duration: 40, text: '40 minutes' },
    { duration: 50, text: '50 minutes' },
    { duration: 60, text: '60 minutes' },
    { duration: 70, text: '70 minutes' }
  ];
  periodOption = [
    { value: 1, display: 'P1' },
    { value: 2, display: 'P2' },
    { value: 3, display: 'P3' },
    { value: 4, display: 'P4' },
    { value: 5, display: 'P5' },
    { value: 6, display: 'P6' }
  ];
  dayOptions = [
    { value: 'all', display: 'All' },
    { value: 'Mon', display: 'Mon' },
    { value: 'Tue', display: 'Tue' },
    { value: 'Wed', display: 'Wed' },
    { value: 'Thu', display: 'Thu' },
    { value: 'Fri', display: 'Fri' },
    { value: 'Sat', display: 'Sat' },
    { value: 'Sun', display: 'Sun' }
  ];
  constructor(private store: Store<CalendarStateModel>, private activatedRoute: ActivatedRoute) {}
  activeBadge = 8;
  emptyArr = new Array(100);
  updateStartTime(event) {
    console.log(event);
    this.updateAssemblyData('startingAt', {duration: event, text: event});
  }
  ngOnInit(): void {
    for(let i = 0; i < this.timeArr.length; i++) {
      this.durations.push({duration: i + 1, text: `${i + 1} mins`})
    }
    for (let i = 0; i < this.timeArr.length; i++) {
      this.intervals.push({ duration: i + 1, text: `${i + 1} mins` });
    }
    this.teachingState= this.store.select(selectTeaching);
    // this.teachingState.subscribe(x => console.log(x, 'yaaaaaaaaaaaaaaaaay'))
    this.allClasses = this.store.select(selectAllClasses).pipe(
      map(unsortedClasses => {
        const unsortedClassesCopy: ClassModel[] = JSON.parse(JSON.stringify(unsortedClasses))
        return unsortedClassesCopy.sort((itemA, itemB)=> itemA.grade - itemB.grade)
      })
    )
  }
  updateInterval(interval) {

  }
  onSetPeriodDuration(duration) {

  }
  toggleClassActive(event) {
    this.store.dispatch(toggleEditClassActive({name: event}))
  }
  toggleActive(event) {
    this.store.dispatch(toggleEditTeachingActive(event))
  }
  setStartTime(event, idx) {

  }

  updateAssemblyData(data, duration) {
    this.store.dispatch(setEditAssemblyData({field: data,  value: duration}))
  }
  onUpdatePeriodDuration(duration) {
    this.store.dispatch(updateCalendarPeriodData({field: 'periodDuration', value: duration.duration.duration}))
  }
  onUpdateInterval(interval) {
    this.store.dispatch(updateCalendarPeriodData({field: 'intervaBtwPeriods', value: interval.duration.duration}))
  }
  updateAssemblyName(data) {
    console.log(data);
    this.store.dispatch(setEditAssemblyData({field: 'name', value: data.target.value}))
  }
  getGroup(groups: ClassGroupModel[]) {
    return of(groups.find(group=> group.id === this.activatedRoute.snapshot.queryParams.groupId));
  }
  selectPeriod($event: SelectedPeriodModel) {
    // this.store.dispatch(selectTeachingDay($event))
  }
  asObservable(item) {
    return of(item);
  }
  selectStartTime(event) {
    // this.store.dispatch(updateEditStartTime(event));
  }
  updateTeachingPeriod(event) {
    console.log(event);
  }
  computeModifications() {
    this.store.dispatch(computeModifications());
  }
  closeModal(){

  }
  startScroll(el) {
    if (typeof this.scrollableEl === 'undefined') {
      return true;
    }
    var vh = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    );
    var scrollableHeight = this.scrollableEl.nativeElement.offsetHeight;
    var maxHeight = vh - 360;

    let res = scrollableHeight >= maxHeight - 10;
    return res;
  }
  parsePeriodValue(arr) {
    if (arr.length == 0) {
      return '';
    }
    let displayValue = '';
    let temp = arr
      .map(number => {
        let suffix;
        if (typeof number === 'string' && number.toLowerCase() === 'all') {
          return `${number}`;
        }
        if (number == 1) {
          suffix = 'st';
        } else if (number == 2) {
          suffix = 'nd';
        } else if (number == 3) {
          suffix = 'rd';
        } else {
          suffix = 'th';
        }
        return `${number}${suffix}`;
      })
      .reduce((a, b) => `${a},${b}`);
    if (arr.length == 1 && arr[0] == '') {
      displayValue = '';
    } else {
      displayValue = `${temp} period`;
    }
    return displayValue;
  }
  updateTitle(item, idx) {
    this.store.dispatch(updateEditBreakData({ index: idx, field: 'title', value: item }));
  }
  removeBreak(item, idx) {
    this.store.dispatch(removeEditBreak({breakIndex: idx}))
  }
  updateAfter(item, idx) {
    this.store.dispatch(updateEditBreakData({ index: idx, field: 'after', value: 'P'+item }));
  }
  updateDuration(item, idx) {
    this.store.dispatch(updateEditBreakData({ index: idx, field: 'duration', value: item }));
  }
  updateDay(item, idx) {
    this.store.dispatch(updateEditBreakData({ index: idx, field: 'day', value: item }));
  }
  addSameBreaks() {
    this.store.dispatch(addEditSameBreak());
  }
  setAssemblyDisplay(isEnabled) {
    this.store.dispatch(setAssemblyEnabledMode({isEnabled}))
  }
  computeName(name: string, idx: number) {
    return `name-${idx}`;
  }
  parseDayValue(arr) {
    let displayValue = '';
    if (arr.length == 0) {
      return '';
    }
    let temp = arr.reduce((a, b) => `${a},${b}`);
    displayValue = `${temp} period`;
    // }
    return arr.reduce((a, b) => `${a},${b}`);
  }
}
