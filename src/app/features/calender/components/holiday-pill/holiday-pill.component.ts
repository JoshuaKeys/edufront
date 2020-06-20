import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { HolidayModel } from '../../models/holiday.model';

@Component({
  selector: 'edu-holiday-pill',
  templateUrl: './holiday-pill.component.html',
  styleUrls: ['./holiday-pill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HolidayPillComponent implements OnInit {
  @Input() holiday: HolidayModel;
  @Output() deleteHoliday = new EventEmitter<HolidayModel>();
  @Output() editHoliday = new EventEmitter<HolidayModel>();
  constructor() { }

  ngOnInit(): void {
  }
  onEdit() {
    this.editHoliday.emit(this.holiday);
  }
  onDelete() {
    this.deleteHoliday.emit(this.holiday);
  }
}
