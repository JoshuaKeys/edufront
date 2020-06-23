import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-email-tab',
  templateUrl: './email-tab.component.html',
  styleUrls: ['./email-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailTabComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  cbStyle = {
    'border-color': '#E6E9F3',
    width: '24px',
    height: '24px'
  };
}
