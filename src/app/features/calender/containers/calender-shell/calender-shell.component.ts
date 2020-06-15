import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-calender-shell',
  templateUrl: './calender-shell.component.html',
  styleUrls: ['./calender-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalenderShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
