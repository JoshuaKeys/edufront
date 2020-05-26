import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
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
  constructor() { }

  ngOnInit(): void {
  }

}
