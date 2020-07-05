import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassGroupModel } from '../../models/class-group.model';
import { SelectedPeriodModel } from '../../models/selected-period.model';

@Component({
  selector: 'edu-update-teaching-periods',
  templateUrl: './update-teaching-periods.component.html',
  styleUrls: ['./update-teaching-periods.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateTeachingPeriodsComponent implements OnInit {
  @Input() classGroup: Observable<ClassGroupModel>;
  @Output() onSelectTime = new EventEmitter<SelectedPeriodModel>()
  constructor() { }

  ngOnInit(): void {
  }
  selectTime(day, classGroup) {
    this.onSelectTime.emit({day, classGroup})
  }
}
