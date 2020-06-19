import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'edu-holiday-pill',
  templateUrl: './holiday-pill.component.html',
  styleUrls: ['./holiday-pill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HolidayPillComponent implements OnInit {
  @Input() name: string;
  @Output() deleteHoliday = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }
  onEdit() {

  }
  onDelete() {
    
  }
}
