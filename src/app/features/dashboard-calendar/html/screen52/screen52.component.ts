import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-screen52',
  templateUrl: './screen52.component.html',
  styleUrls: ['./screen52.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Screen52Component implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  yearOptions = [2019, 2020, 2021, 2022];
  termOptions = ['All Terms', 'Term 1', 'Term 2'];
  emptyArr = new Array(10);
  yearPopoverState = false;
  termPopoverState = false;
  log(param) {
    console.log(param);
  }
  closeYearSelector() {
    this.yearPopoverState = !this.yearPopoverState;
  }
  closeTermSelector() {
    this.termPopoverState = !this.termPopoverState;
  }
}
