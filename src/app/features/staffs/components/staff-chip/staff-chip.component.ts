import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { StaffModel } from '../../models/staff.model';

@Component({
  selector: 'edu-staff-chip',
  templateUrl: './staff-chip.component.html',
  styleUrls: ['./staff-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffChipComponent implements OnInit {
  @Input() gender: string;
  @Input() staff: StaffModel;

  @Output() edit = new EventEmitter<StaffModel>();
  constructor() { }
  ngOnInit(): void {
  }
  onEdit(staff: StaffModel) {
    this.edit.emit(staff);
  }
}
