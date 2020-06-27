import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-start-time-of-each-period',
  templateUrl: './start-time-of-each-period.component.html',
  styleUrls: ['./start-time-of-each-period.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartTimeOfEachPeriodComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  tempArr = Array(20).fill('');
  timeArr = Array(7).fill('08:00');
  popoverArr = Array(12).fill('');
  hrSelector = Array(12).fill('');
  minSelector = Array(61).fill('');

  // periods:[1]

  addToTempArr() {
    this.tempArr.push('');
  }
  isWeekend(index) {
    if (index > 4) {
      return 'badge--inactive';
    }
    return '';
  }

  display2Digit(value: number) {
    if (value < 10) {
      return `0${value}`;
    } else {
      return value;
    }
  }
}
