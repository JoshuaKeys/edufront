import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { StaffModel } from '../../models/staff.model';
import { StaffsCommunicatorService } from 'src/app/features/staffs/services/staffs-communication.service';

@Component({
  selector: 'edu-shared-staff-chip',
  templateUrl: './staff-chip.component.html',
  styleUrls: ['./staff-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SharedStaffChipComponent implements OnInit, OnChanges {
  @Input() gender: string;
  @Input() staff: StaffModel;
  @Input() editMode: boolean = true;

  constructor(private staffsCommunicator: StaffsCommunicatorService) {}
  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges) {
    this.staff = changes.staff.currentValue;
  }
  onEdit(staff: StaffModel) {
    this.staffsCommunicator.editStaff(staff);
  }
  onDelete(staff: StaffModel) {
    this.staffsCommunicator.removeStaff(staff);
  }
}
