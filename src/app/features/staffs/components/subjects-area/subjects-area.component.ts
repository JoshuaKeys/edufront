import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { ClassModel } from 'src/app/shared/models/class.model';
import { Observable } from 'rxjs';
import { SubjectModel } from 'src/app/shared/models/_subject.model';
import { SelectableSubjectModel } from 'src/app/shared/models/selectable-subject.model';
import { SubjectClassesAssociation } from '../../models/subject-classes-association.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'edu-subjects-area',
  templateUrl: './subjects-area.component.html',
  styleUrls: ['./subjects-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectsAreaComponent implements OnInit, OnChanges, OnDestroy {
  isOpen = false;
  @Input() classesAndSubject: Observable<SubjectClassesAssociation[]>;
  @Input() classes: Observable<ClassModel[]>;
  @Input() subjects: Observable<SelectableSubjectModel[]>;
  @Output() selectSubject = new EventEmitter<string>();
  @Output() unSelectSubject = new EventEmitter<string>();
  @Output() classClicked = new EventEmitter<ClassModel>();
  @Output() classSubAssocClicked = new EventEmitter<{ title: string; classes: string[] }>();
  subjectsData: Observable<SelectableSubjectModel[]>;

  constructor() { }
  setActive(subject: { title: string; classes: string[] }) {
    this.classSubAssocClicked.emit(subject)
  }
  toggleSubject(subject: SelectableSubjectModel) {
    if (!subject.selected) {
      this.selectSubject.emit(subject.id)
      return;
    }
    this.unSelectSubject.emit(subject.id)
  }
  ngOnInit(): void {
    this.subjectsData = this.subjects;
  }
  ngOnDestroy() {
    this.classes = null;
    this.subjects = null;
  }
  ngOnChanges(changes: SimpleChanges) {
    this.classes = changes.classes.currentValue;
    if (changes.subjects && !changes.subjects.firstChange) {
      console.log(changes.subjects)
      console.log('Hollaaa')
      this.subjects = changes.subjects.currentValue;
    }

  }
  onClassClicked(classItem: ClassModel) {
    this.classClicked.emit(classItem);
  }
  commitItems() {
    this.toggleSubjectClassesBox()
  }
  toggleSubjectClassesBox() {
    this.isOpen = !this.isOpen;
  }
  onSearch(event) {
    const inputData = event.target.value;
    this.subjectsData = this.subjects.pipe(
      map(subjects => subjects.filter(subject => subject.title.match(inputData)))
    )
  }
}
