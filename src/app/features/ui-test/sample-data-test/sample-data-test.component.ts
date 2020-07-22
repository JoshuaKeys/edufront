import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-sample-data-test',
  templateUrl: './sample-data-test.component.html',
  styleUrls: ['./sample-data-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleDataTestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  title = '';
}
