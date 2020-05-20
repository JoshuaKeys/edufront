import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SubjectsStateModel } from '../../models/subjects-state.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { selectAllClasses, selectSortedClasses, selectAllSubjects, getCommonClasses, selectSubjectModalState } from '../../ngrx/selectors';
import { SubjectModel } from '../../models/subject.model';
import { assignToSelectedClassesRequest, toggleClass, toggleFormModal, createSubjectRequest } from '../../ngrx/actions';
import { SubjectModalStateModel } from '../../models/subject-modal-state.model';
import { CreateSubjModel } from '../../models/create-subject.model';
import { filter, map } from 'rxjs/operators';


@Component({
  selector: 'edu-assign-subjects-question',
  templateUrl: './assign-subjects-question.component.html',
  styleUrls: ['./assign-subjects-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignSubjectsQuestionComponent implements OnInit {
  filter = '';
  activatedRouteData = this.activatedRoute.snapshot.data;
  classes: Observable<ClassModel[]>;
  modalState: Observable<SubjectModalStateModel>;
  allSubjects: Observable<SubjectModel[]>;
  filteredSubjects: Observable<SubjectModel[]>;
  subjectsInterception: Observable<SubjectModel[]>;
  ngOnInit(): void {
    this.allSubjects = this.store.select(selectAllSubjects)
    this.classes = this.store.select(selectSortedClasses);
    this.modalState = this.store.select(selectSubjectModalState)
    this.subjectsInterception = this.store.select(getCommonClasses);
    this.subjectsInterception.subscribe()
    this.setupFilter();
  }
  setupFilter() {
    this.filteredSubjects = this.allSubjects.pipe(
      map(subjects => {
        return subjects.filter(item => item.title.match(this.filter))
      })
    )
  }
  updateFilter(event) {
    const value = event.target.value;
    this.filter = value;
    this.setupFilter();
  }
  createSubject(subject: CreateSubjModel) {
    this.store.dispatch(createSubjectRequest({ subject }))
    this.store.dispatch(toggleFormModal())
  }
  openFormModal() {
    this.store.dispatch(toggleFormModal())
  }
  updateSelectedState(classId: string) {
    this.store.dispatch(toggleClass({ classId }))
  }
  onDragOver(event) {

  }
  onDrop(subject: SubjectModel) {
    this.store.dispatch(assignToSelectedClassesRequest({ subject }))
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<SubjectsStateModel>
  ) { }
}
