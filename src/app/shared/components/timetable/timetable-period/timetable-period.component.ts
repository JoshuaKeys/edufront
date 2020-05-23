import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-timetable-period',
  templateUrl: './timetable-period.component.html',
  styleUrls: ['./timetable-period.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimetablePeriodComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
