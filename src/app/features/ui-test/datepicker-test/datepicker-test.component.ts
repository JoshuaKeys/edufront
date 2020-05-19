import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-datepicker-test',
  templateUrl: './datepicker-test.component.html',
  styleUrls: ['./datepicker-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerTestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
