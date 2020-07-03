import { Component, OnInit, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { TeachingStateModel } from '../../models/teaching-state.model';
import { Store } from '@ngrx/store';
import { CalendarStateModel } from '../../models/calender-state.model';
import { selectTeaching } from '../../ngrx/selectors';
import { ClassGroupModel } from '../../models/class-group.model';
import { ActivatedRoute, Router } from '@angular/router';
import { editCalendar, sendCalendarData } from '../../ngrx/actions/calendar.actions';
let weirdData = [
  {
    day: 'Mon',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    startTime: '09:15',
    periodDuration: '30',
    intervaBtwPeriods: '10',
    breaks: [],
    assembly: { name: 'ass1', startingAt: '07:00', duration: '60' }
  },
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '10',
    breaks: [],
    assembly: { name: 'ass1', startingAt: '07:00', duration: '60' }
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '10',
    breaks: [],
    assembly: { name: 'ass1', startingAt: '07:00', duration: '60' }
  }
];
let testData = [
  {
    day: 'Mon',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    startTime: '09:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Thu',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  {
    day: 'Fri',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  },
  ,
  {
    day: 'Sat',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9'],
    startTime: '08:30',
    periodDuration: '0',
    intervaBtwPeriods: '0',
    breaks: [],
    assembly: { name: '', startingAt: '', duration: '' }
  }
];

@Component({
  selector: 'edu-calendar-confirmation',
  templateUrl: './calendar-confirmation.component.html',
  styleUrls: ['./calendar-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarConfirmationComponent implements OnInit {
  teachingData: Observable<TeachingStateModel>;
  activatedRouteData = this.activatedRoute.snapshot.data;
  constructor(
    private store: Store<CalendarStateModel>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.teachingData = this.store.select(selectTeaching);
    this.teachingData.subscribe(x => console.log('yyyyyyyyaaaaaay', x))
  }
  sendCalendarData() {
    this.store.dispatch(sendCalendarData())
  }
  computeClassName(classGroup: ClassGroupModel) {
    let classes = '';
    for(let i=0; i < classGroup.classes.length; i++) {
      if(i < classGroup.classes.length-1){
        classes += classGroup.classes[i].name + '|';
      }else {
        classes += classGroup.classes[i].name;
      }
    }
    return classes;
  }
  @ViewChild('scrollableEl') scrollableEl: ElementRef;
  timetableArr2 = [weirdData, testData]; //tempDisplayData

  timetableArr = new Array(15).fill(testData);

  imageSize = {
    width: '380px',
    height: '456px'
  };

  onEdit(index, group: ClassGroupModel) {
    this.store.dispatch(editCalendar({group}));
    this.router.navigate(['../', this.activatedRouteData.next], {relativeTo: this.activatedRoute, queryParams: {
      groupId: group.id
    }})
  }
  onTick(index) {
    console.log(`tick @ ${index}`);
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
    var maxHeight = vh - 330;
    // console.log(
    //   'maxHeight - ' + maxHeight + ',scrollable - ' + scrollableHeight
    // );
    let res = scrollableHeight >= maxHeight - 10;
    // console.log(res);
    return res;
  }
}
