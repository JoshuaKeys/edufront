import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'edu-period-update',
  templateUrl: './period-update.component.html',
  styleUrls: ['./period-update.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodUpdateComponent implements OnInit {

  constructor() { }
  @Input() activeBadge: number;
  @Input() day: string;
  @Input() type: string;
  @Input() time: string;
  // @Output() periodSelected = new EventEmitter<>()
  ngOnInit(): void {
  }
  updatePeriod(event, period) {
    console.log(event, period);
  }
}
