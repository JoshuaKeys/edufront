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
  goToDashboard() {
    this.router.navigateByUrl('/dashboard')
  }
  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }
}
