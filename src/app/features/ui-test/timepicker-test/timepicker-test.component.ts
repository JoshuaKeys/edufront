import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-timepicker-test',
  templateUrl: './timepicker-test.component.html',
  styleUrls: ['./timepicker-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimepickerTestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  testModel;
}
