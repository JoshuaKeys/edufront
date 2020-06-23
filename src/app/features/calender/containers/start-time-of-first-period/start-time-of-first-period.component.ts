import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-start-time-of-first-period',
  templateUrl: './start-time-of-first-period.component.html',
  styleUrls: ['./start-time-of-first-period.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartTimeOfFirstPeriodComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  test() {
    alert('holla')
  }
}
