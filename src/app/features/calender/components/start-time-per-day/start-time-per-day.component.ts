import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassGroupModel } from '../../models/class-group.model';
import { SelectedPeriodModel } from '../../models/selected-period.model';

@Component({
  selector: 'edu-start-time-per-day',
  templateUrl: './start-time-per-day.component.html',
  styleUrls: ['./start-time-per-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartTimePerDayComponent implements OnInit {
  @Input() classGroup: Observable<ClassGroupModel>;
  @Output() onSelectTime = new EventEmitter<SelectedPeriodModel>()
  constructor() { }

  ngOnInit(): void {
  }
  selectTime(day, group) {
    this.onSelectTime.emit({day, classGroup: group})
  }
}
