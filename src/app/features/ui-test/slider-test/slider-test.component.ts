import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-slider-test',
  templateUrl: './slider-test.component.html',
  styleUrls: ['./slider-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderTestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  testArr = new Array(5);
  log(param) {
    console.log(param);
  }
}
