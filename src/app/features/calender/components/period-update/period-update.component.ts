import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'edu-period-update',
  templateUrl: './period-update.component.html',
  styleUrls: ['./period-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodUpdateComponent implements OnInit {

  constructor() { }
  @Input() activeBadge: number
  ngOnInit(): void {
  }

}
