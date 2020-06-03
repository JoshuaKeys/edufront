import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-popover-test',
  templateUrl: './popover-test.component.html',
  styleUrls: ['./popover-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopoverTestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
