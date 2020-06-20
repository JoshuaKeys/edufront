import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-days-of-week',
  templateUrl: './days-of-week.component.html',
  styleUrls: ['./days-of-week.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysOfWeekComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
