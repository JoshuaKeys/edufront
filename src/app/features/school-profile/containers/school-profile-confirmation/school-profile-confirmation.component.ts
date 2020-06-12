import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PreviewModel } from '../../models/preview.model';
import { Store } from '@ngrx/store';
import { selectPreviewState } from '../../ngrx/selectors';
import { ProfileModalModel } from '../../models/profile-modal.model';
import { selectProfileModal } from '../../ngrx/selectors/modal-selectors';
import { createSchoolRequest } from '../../ngrx/actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'edu-school-profile-confirmation',
  templateUrl: './school-profile-confirmation.component.html',
  styleUrls: ['./school-profile-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolProfileConfirmationComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  previewState: Observable<PreviewModel[]>;
  modalState: Observable<ProfileModalModel>;
  ngOnInit(): void {
    this.previewState = this.store.select(selectPreviewState);
    this.modalState = this.store.select(selectProfileModal)
  }
  goToDashboard() {
    this.router.navigateByUrl('/dashboard')
  }
  goToClassCreation() {
    this.router.navigateByUrl('/classes-and-groups/classes-in-school')
  }
  getModalBody() {
    return `Well done on completeing the first step, you can either go back
      to the Dashboard, or you can proceed straight to the next step. Class Creation.
    `
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<PreviewModel>
  ) { }
  submit() {
    this.store.dispatch(createSchoolRequest())
  }
}
