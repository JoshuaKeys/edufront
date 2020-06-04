import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edu-school-logo-question',
  templateUrl: './school-logo-question.component.html',
  styleUrls: ['./school-logo-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolLogoQuestionComponent {
  activatedRouteData = this.activatedRoute.snapshot.data;

  constructor(private activatedRoute: ActivatedRoute) { }
}
