import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TeachingDay } from '../../models/teaching-day.model';

@Component({
  selector: 'edu-days-of-week',
  templateUrl: './days-of-week.component.html',
  styleUrls: ['./days-of-week.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysOfWeekComponent implements OnInit {
  @Input() teachingDays: Observable<TeachingDay[]>;
  @Output() toggleActive = new EventEmitter<TeachingDay>()
  constructor() { }

  ngOnInit(): void {
  }
  onToggleActive(day: TeachingDay) {
    this.toggleActive.emit(day);
  }
}
