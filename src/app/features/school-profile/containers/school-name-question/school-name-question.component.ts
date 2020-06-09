import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalModel } from 'src/app/shared/models/modal.model';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { PreviewModel } from '../../models/preview.model';
import { setSchoolName } from '../../ngrx/actions';
import { selectSchoolName } from '../../ngrx/selectors'
import { selectProfileModal } from '../../ngrx/selectors/modal-selectors';

@Component({
  selector: 'edu-school-name-question',
  templateUrl: './school-name-question.component.html',
  styleUrls: ['./school-name-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolNameQuestionComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  modalState: Observable<ModalModel>;

  schoolNameForm: FormGroup;
  validity: boolean;
  selectedSchoolName: Observable<string>;

  ngOnInit(): void {
    this.selectedSchoolName = this.store.select(selectSchoolName)
    this.selectedSchoolName.subscribe(console.log)
    this.modalState = this.store.select(selectProfileModal);
    this.modalState.subscribe(modal => console.log('hello', modal));
    this.selectedSchoolName.subscribe(schoolName => {
      this.schoolNameForm = new FormGroup({
        schoolName: new FormControl(schoolName, Validators.required)
      })
      this.validity = !!this.schoolNameForm.value.schoolName
    })
  }
  onModalBtnClicked() {

  }
  getDescription() {

  }
  goToDashboard() {
    this.router.navigateByUrl('/dashboard')
  }
  updateSchoolName(event: InputEvent) {
    const schoolName = event.target['value'];
    this.store.dispatch(setSchoolName({ schoolName }))
  }
  onKeyPress(event) {
    if (event.key.toLowerCase() === 'enter') {

      this.router.navigate(['../', this.activatedRouteData.next], { relativeTo: this.activatedRoute })
    }
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<PreviewModel>,
  ) { }
}
