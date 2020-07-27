import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SubjectsStateModel } from '../../models/subjects-state.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { selectAllClasses, selectSortedClasses, selectAllSubjects, getCommonClasses, selectSubjectModalState, getAllSelectedClasses } from '../../ngrx/selectors';
import { SubjectModel } from '../../models/subject.model';
import { assignToSelectedClassesRequest, toggleClass, toggleFormModal, createSubjectRequest, removeFromSelectedClassesRequest } from '../../ngrx/actions';
import { SubjectModalStateModel } from '../../models/subject-modal-state.model';
import { CreateSubjModel } from '../../../../shared/models/create-subject.model';
import { filter, map } from 'rxjs/operators';
import { ISubjectWithTeachers } from 'src/app/shared/models/subject.model';



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
  allSubjects: Observable<ISubjectWithTeachers[]>;
  filteredSubjects: Observable<ISubjectWithTeachers[]>;
  subjectsInterception: Observable<SubjectModel[]>;
  selectedClasses: Observable<ClassModel[]>;
  ngOnInit(): void {
    this.allSubjects = this.store.select(selectAllSubjects)
    this.classes = this.store.select(selectSortedClasses);
    this.modalState = this.store.select(selectSubjectModalState);
    this.subjectsInterception = this.store.select(getCommonClasses);
    this.selectedClasses = this.store.select(getAllSelectedClasses);

    this.setupFilter();
  }
  onRemoveSubject(subject: SubjectModel) {
    this.store.dispatch(removeFromSelectedClassesRequest({ subject }))
  }
  setupFilter() {
    this.filteredSubjects = this.allSubjects.pipe(
      map(subjects => {
        return subjects.filter(item => item.title.match(this.filter))
      })
    )
  }
  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
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
    private store: Store<SubjectsStateModel>,
    private router: Router
  ) { }
}
