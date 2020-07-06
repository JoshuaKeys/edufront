import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ClassGroupModel } from '../../models/class-group.model';
import { SelectedPeriodModel } from '../../models/selected-period.model';
import { PeriodModel } from '../../models/period.model';

@Component({
  selector: 'edu-update-teaching-periods',
  templateUrl: './update-teaching-periods.component.html',
  styleUrls: ['./update-teaching-periods.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UpdateTeachingPeriodsComponent implements OnInit {
  @Input() teachingPeriods: Observable<PeriodModel[]>;
  @Output() onUpdatePeriod = new EventEmitter<{ day: string; value: string }>()
  constructor() { }

  ngOnInit(): void {
  }
  updatePeriod(event) {
    this.onUpdatePeriod.emit(event);
  }
}
