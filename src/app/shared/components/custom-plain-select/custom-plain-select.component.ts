import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-custom-plain-select',
  templateUrl: './custom-plain-select.component.html',
  styleUrls: ['./custom-plain-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomPlainSelectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
