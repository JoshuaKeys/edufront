import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { SubjectsStateModel } from '../../models/subjects-state.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { Observable } from 'rxjs';
import { selectSortedClasses, getAllSelectedClasses, selectSubjectModalState } from '../../ngrx/selectors';
import { SubjectModalStateModel } from '../../models/subject-modal-state.model';
import { toggleEndModal, postClassesSubjectsRequest } from '../../ngrx/actions';

@Component({
  selector: 'edu-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  classes: Observable<ClassModel[]>;
  modalState: Observable<SubjectModalStateModel>;
  ngOnInit(): void {
    this.modalState = this.store.select(selectSubjectModalState)
    this.classes = this.store.select(getAllSelectedClasses);
  }
  saveSubjects() {
    this.store.dispatch(postClassesSubjectsRequest())
    // this.store.dispatch(toggleEndModal())
  }
  goToStudents() {

  }
  get description() {
    return `You made it! Now that we know what is taught in the school, we can move
    on to creating the users and profiles. This can be a lot of data entry, so don't
    hesitate to take a break now if you need it.`
  }
  goToDashboard() {

  }
  constructor(private activatedRoute: ActivatedRoute, private store: Store<SubjectsStateModel>) { }
}
