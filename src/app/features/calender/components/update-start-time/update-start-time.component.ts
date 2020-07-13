import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassGroupModel } from '../../models/class-group.model';
import { SelectedPeriodModel } from '../../models/selected-period.model';
import { PeriodModel } from '../../models/period.model';

@Component({
  selector: 'edu-update-start-time',
  templateUrl: './update-start-time.component.html',
  styleUrls: ['./update-start-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateStartTimeComponent implements OnInit {
  @Input() teachingPeriods: Observable<PeriodModel[]>;
  @Output() onSelectTime = new EventEmitter<SelectedPeriodModel>()
  constructor() { }

  ngOnInit(): void {
  }
  onTimeChanged(event) {
    this.onSelectTime.emit(event);
  }
}
