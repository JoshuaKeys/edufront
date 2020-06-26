import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CalendarModel } from '../timetable-preview/calendar.interface';
@Component({
  selector: 'edu-preview-test',
  templateUrl: './preview-test.component.html',
  styleUrls: ['./preview-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTestComponent implements OnInit {
  constructor() {}
  data;
  ngOnInit(): void {
    this.data = newState;
  }
}
let newState: CalendarModel[] = [
  {
    day: 'Tue',
    periods: ['P1', 'P2', 'P3', 'P4'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '10',
    breaks: [
      {
        name: 'break 1',
        firstBreak: '',
        day: '',
        after: 'P1',
        duration: '90'
      },
      {
        name: 'break 2',
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '90'
      }
    ],
    assembly: { name: 'assembly1', startingAt: '07:30', duration: '60' }
  },
  {
    day: 'Wed',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '10',
    breaks: [
      {
        name: 'break 2 ',
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '90'
      }
    ],
    assembly: { name: 'assembly1', startingAt: '07:30', duration: '60' }
  },
  {
    day: 'Thu',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '10',
    breaks: [
      {
        name: 'break 1123 ',
        firstBreak: '',
        day: '',
        after: 'P1',
        duration: '90'
      },
      {
        name: 'break 2 ',
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '90'
      }
    ],
    assembly: { name: 'assembly1', startingAt: '07:30', duration: '60' }
  },
  {
    day: 'Fri',
    periods: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8'],
    startTime: '08:30',
    periodDuration: '30',
    intervaBtwPeriods: '10',
    breaks: [
      {
        name: 'break 1 ',
        firstBreak: '',
        day: '',
        after: 'P1',
        duration: '90'
      },
      {
        name: 'break 2 ',
        firstBreak: '',
        day: '',
        after: 'P5',
        duration: '90'
      }
    ],
    assembly: { name: 'assembly1', startingAt: '07:30', duration: '60' }
  }
];
