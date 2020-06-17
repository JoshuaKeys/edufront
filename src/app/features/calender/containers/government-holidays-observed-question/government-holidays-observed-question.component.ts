import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-government-holidays-observed-question',
  templateUrl: './government-holidays-observed-question.component.html',
  styleUrls: ['./government-holidays-observed-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GovernmentHolidaysObservedQuestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
