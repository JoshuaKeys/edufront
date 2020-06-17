import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-vacation-names-and-dates-question',
  templateUrl: './vacation-names-and-dates-question.component.html',
  styleUrls: ['./vacation-names-and-dates-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VacationNamesAndDatesQuestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
