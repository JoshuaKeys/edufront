import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SubjectsStateModel } from '../../models/subjects-state.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { selectAllClasses, selectSortedClasses, selectAllSubjects } from '../../ngrx/selectors';
import { SubjectModel } from '../../models/subject.model';
import { assignSubjectToSelectedClasses } from '../../ngrx/actions';

@Component({
  selector: 'edu-assign-subjects-question',
  templateUrl: './assign-subjects-question.component.html',
  styleUrls: ['./assign-subjects-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignSubjectsQuestionComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  classes: Observable<ClassModel[]>;
  allSubjects: Observable<SubjectModel[]>
  ngOnInit(): void {
    this.allSubjects = this.store.select(selectAllSubjects)
    this.classes = this.store.select(selectSortedClasses);
    this.classes.subscribe(console.log);
  }
  onClassClick() {

  }
  onDragOver(event) {

  }
  onDrop(subject: SubjectModel) {
    this.store.dispatch(assignSubjectToSelectedClasses({ subject }))
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<SubjectsStateModel>
  ) { }
}
