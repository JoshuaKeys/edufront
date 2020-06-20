import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-holiday-add',
  templateUrl: './holiday-add.component.html',
  styleUrls: ['./holiday-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HolidayAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
