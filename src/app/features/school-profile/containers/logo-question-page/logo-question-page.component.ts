import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-logo-question-page',
  templateUrl: './logo-question-page.component.html',
  styleUrls: ['./logo-question-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoQuestionPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
