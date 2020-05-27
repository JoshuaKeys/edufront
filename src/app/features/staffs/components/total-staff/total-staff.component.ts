import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'edu-total-staff',
  templateUrl: './total-staff.component.html',
  styleUrls: ['./total-staff.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalStaffComponent implements OnInit {
  @Input() numOfStaffs: Observable<number>;
  constructor() { }

  ngOnInit(): void {
  }

}
