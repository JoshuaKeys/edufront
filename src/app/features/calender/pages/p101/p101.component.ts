import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'edu-p101',
  templateUrl: './p101.component.html',
  styleUrls: ['./p101.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class P101Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  @ViewChild('scrollableEl') scrollableEl: ElementRef;
  timetableArr2 = [weirdData, testData]; //tempDisplayData

  timetableArr = new Array(15).fill(testData);

  imageSize = {
    width: '380px',
    height: '456px'
  };

  onEdit(index) {
    console.log(`editing @ ${index}`);
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
