import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HolidayListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
