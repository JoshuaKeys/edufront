import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TeachingDay } from '../../models/teaching-day.model';
import { ClassGroupModel } from '../../models/class-group.model';
import { SelectedPeriodModel } from '../../models/selected-period.model';
import { DayModel } from '../../models/day.model';

@Component({
  selector: 'edu-periods-per-day',
  templateUrl: './periods-per-day.component.html',
  styleUrls: ['./periods-per-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodsPerDayComponent implements OnInit {
  @Input() classGroup: Observable<ClassGroupModel>;
  @Output() onSelectPeriod = new EventEmitter<SelectedPeriodModel>()
  constructor() { }

  ngOnInit(): void {
    this.classGroup.subscribe(console.log);
  }
  selectPeriod(day: TeachingDay, group: ClassGroupModel) {
    if(!day.period) {
      return;
    }
    this.onSelectPeriod.emit({day, classGroup: group})
  }
}
