import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { SubjectModalStateModel } from '../../models/subject-modal-state.model';
import { Store } from '@ngrx/store';
import { SubjectsStateModel } from '../../models/subjects-state.model';
import { selectSubjectModalState, selectAllSubjects } from './../../ngrx/selectors';
import { closeSubjectsStartModal, createSubjectRequest } from '../../ngrx/actions';
import { SubjectModel } from '../../models/subject.model';
import { CreateSubjModel } from '../../../../shared/models/create-subject.model';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'edu-subjects-taught-question',
  templateUrl: './subjects-taught-question.component.html',
  styleUrls: ['./subjects-taught-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectsTaughtQuestionComponent implements OnInit {
  modalState: Observable<SubjectModalStateModel>;
  allSubjects: Observable<SubjectModel[]>
  activatedRouteData = this.activatedRoute.snapshot.data;

  ngOnInit(): void {
    this.modalState = this.store.select(selectSubjectModalState)
    this.allSubjects = this.store.select(selectAllSubjects)
  }
  onModalBtnClicked() {
    this.store.dispatch(closeSubjectsStartModal())
  }
  createSubject(subject: CreateSubjModel) {
    const subSubjects = subject.subSubjects.filter(subSubject=> subSubject.title !== null);
    const clearedSubject: CreateSubjModel = {...subject, subSubjects}
    this.store.dispatch(createSubjectRequest({ subject: clearedSubject }));
  }
  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
  getDescription() {
    return `
      We now need to know what subjects are taught in your school. Just
      create a tag for each one and fill in the details. After you have created
      all the tags, assign them to the relevant classes. This will speed up timetable
      and course management tremendously.
    `
  }
  constructor(
    private store: Store<SubjectsStateModel>,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }
}
