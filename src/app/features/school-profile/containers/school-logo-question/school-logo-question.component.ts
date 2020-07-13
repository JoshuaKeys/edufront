import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SchoolProfileModel } from '../../models/school-profile.model';
import { clearLogoPreview, setHasSchoolLogoState } from '../../ngrx/actions';
import { Observable } from 'rxjs';
import { selectSchoolProfile } from '../../ngrx/selectors';
import { ProfileModel } from '../../models/profile.model';

@Component({
  selector: 'edu-school-logo-question',
  templateUrl: './school-logo-question.component.html',
  styleUrls: ['./school-logo-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolLogoQuestionComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  schoolProfileState: Observable<ProfileModel>;
  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
  clearLogoPreview() {
    this.setSchoolLogoStatus(false);
    this.store.dispatch(clearLogoPreview());
  }
  setSchoolLogoStatus(status: boolean) {
    this.store.dispatch(setHasSchoolLogoState({ value: status }))
  }
  ngOnInit() {
    this.schoolProfileState = this.store.select(selectSchoolProfile)
  }
  constructor(
    private store: Store<SchoolProfileModel>,
    private activatedRoute: ActivatedRoute, private router: Router) { }
}
