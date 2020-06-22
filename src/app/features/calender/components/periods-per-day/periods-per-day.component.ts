import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TeachingDay } from '../../models/teaching-day.model';

@Component({
  selector: 'edu-periods-per-day',
  templateUrl: './periods-per-day.component.html',
  styleUrls: ['./periods-per-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodsPerDayComponent implements OnInit {
  @Input() teachingDays: Observable<TeachingDay[]>;
  @Output() toggleActive = new EventEmitter<TeachingDay>()
  constructor() { }

  ngOnInit(): void {
    this.teachingDays.subscribe(console.log)
  }
  onToggleActive(day) {

  }
}
