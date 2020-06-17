import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SchoolProfileModel } from '../../models/school-profile.model';
import { clearLogoPreview } from '../../ngrx/actions';

@Component({
  selector: 'edu-school-logo-question',
  templateUrl: './school-logo-question.component.html',
  styleUrls: ['./school-logo-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolLogoQuestionComponent {
  activatedRouteData = this.activatedRoute.snapshot.data;
  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
  clearLogoPreview() {
    this.store.dispatch(clearLogoPreview());
  }
  constructor(
    private store: Store<SchoolProfileModel>,
    private activatedRoute: ActivatedRoute, private router: Router) { }
}
