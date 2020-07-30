import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConsoleClassesStateModel } from '../../models/console-classes-state.model';
import { fetchAllClassesForSubjects, fetchAllSubjects, toggleConsoleSubjectsClassSelectedState, removeFromSelectedConsoleSubjectsClassesRequest, assignToSelectedConsoleSubjectsClassesRequest, createSubjectRequestFromConsole } from '../../ngrx/actions/console-classes/console-classes-groups.actions';
import { Observable } from 'rxjs';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { selectAllClassesForSubjects, selectAllSubjectsForConsole, getConsoleCommonClasses, selectConsoleSubjectsSelectedClasses } from '../../ngrx/selectors/console-classes';
import { ConsoleClassesService } from '../../services/console-classes/console-classes.service';
import { ISubjectWithTeachers, SubjectModel } from 'src/app/shared/models/subject.model';
import { map } from 'rxjs/operators';
import { CreateSubjModel } from 'src/app/shared/models/create-subject.model';

@Component({
  selector: 'edu-console-subjects',
  templateUrl: './console-subjects.component.html',
  styleUrls: ['./console-subjects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleSubjectsComponent implements OnInit {
  filteredSubjects: Observable<ISubjectWithTeachers[]>;
  classes: Observable<ExtendedClassModel[]>;
  subjects: Observable<ISubjectWithTeachers[]>;
  selectedClasses: Observable<ExtendedClassModel[]>
  filter = ''
  sidePanelIsActive = false;
  subjectsInterception: Observable<SubjectModel[]>;
  onDrop(subject) {
    console.log(subject)
    this.store.dispatch(assignToSelectedConsoleSubjectsClassesRequest({ subject }))
  }
  onRemoveSubject(subject) {
    this.store.dispatch(removeFromSelectedConsoleSubjectsClassesRequest({ subject }))
  }
  ngOnInit(): void {
    this.store.dispatch(fetchAllClassesForSubjects());
    this.store.dispatch(fetchAllSubjects())
    this.classes = this.store.select(selectAllClassesForSubjects);
    this.subjects = this.store.select(selectAllSubjectsForConsole);
    this.selectedClasses = this.store.select(selectConsoleSubjectsSelectedClasses)
    this.subjectsInterception = this.store.select(getConsoleCommonClasses);
    this.setupFilter();
    this.consoleService.getAllFullClasses().subscribe(
      x => console.log('classes', x)
    )
  }
  createSubject(subject: CreateSubjModel) {
    const subSubjects = subject.subSubjects.filter(subSubject => subSubject.title !== null);
    const clearedSubject: CreateSubjModel = { ...subject, subSubjects }
    this.store.dispatch(createSubjectRequestFromConsole({ subject: clearedSubject }));
  }
  updateFilter(event) {
    const value = event.target.value;
    this.filter = value;
    this.setupFilter();
  }
  openFormModal() {
  }
  updateSelectedState(event) {
    console.log(event);
    this.store.dispatch(toggleConsoleSubjectsClassSelectedState({ classId: event }))
  }
  toggleSidePanel() {
    this.sidePanelIsActive = !this.sidePanelIsActive;
  }
  setupFilter() {
    this.filteredSubjects = this.subjects.pipe(
      map(subjects => {
        return subjects.filter(item => item.title.match(this.filter))
      })
    )
  }
  constructor(private store: Store<ConsoleClassesStateModel>, private consoleService: ConsoleClassesService) {
  }

}
