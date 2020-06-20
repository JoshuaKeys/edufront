import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-teaching-day-for-class-question',
  templateUrl: './teaching-day-for-class-question.component.html',
  styleUrls: ['./teaching-day-for-class-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeachingDayForClassQuestionComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  emptyarr = [0, 1, 23, 4, 5, 6, 7, 8, , 9, 10];
}
