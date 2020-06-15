import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-academic-year-question',
  templateUrl: './academic-year-question.component.html',
  styleUrls: ['./academic-year-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicYearQuestionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
