import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-same-teaching-days-question',
  templateUrl: './same-teaching-days-question.component.html',
  styleUrls: ['./same-teaching-days-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SameTeachingDaysQuestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
