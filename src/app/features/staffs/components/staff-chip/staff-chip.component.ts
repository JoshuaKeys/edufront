import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { StaffModel } from '../../../../shared/models/staff.model';
import { StaffsCommunicatorService } from '../../services/staffs-communication.service';

@Component({
  selector: 'edu-staff-chip',
  templateUrl: './staff-chip.component.html',
  styleUrls: ['./staff-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffChipComponent implements OnInit, OnChanges {
  @Input() gender: string;
  @Input() staff: StaffModel;

  constructor(private staffsCommunicator: StaffsCommunicatorService) { }
  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.staff = changes.staff.currentValue;
  }
  onEdit(staff: StaffModel) {
    this.staffsCommunicator.editStaff(staff)
  }
  onDelete(staff: StaffModel) {
    this.staffsCommunicator.removeStaff(staff)
  }
}
