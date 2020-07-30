import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { CreateSubjModel } from 'src/app/shared/models/create-subject.model';
import { SubSubjectModel } from 'src/app/shared/models/sub-subject.model';
@Component({
  selector: 'edu-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidePanelComponent implements OnInit {
  @Input() sidePanelIsActive: boolean;
  @Input() style: {
    position: string;
    top: string;
  };
  @Output() closeSidePanel = new EventEmitter()
  @Output() createSubject = new EventEmitter();
  addSubjForm = this.fb.group({
    subjectName: ['', Validators.required],
    subSubjects: this.fb.array([this.fb.control('')]),
    activities: this.fb.array([this.fb.control('')])
  });
  get subSubjects() {
    return this.addSubjForm.get('subSubjects') as FormArray;
  }
  get activities() {
    return this.addSubjForm.get('activities') as FormArray;
  }
  processArrayFields(
    type: 'activity' | 'subsubject',
    subFields: string[]
  ): SubSubjectModel[] {
    return subFields
      .filter(subField => subField !== '')
      .map(subField => ({
        title: subField,
        id: '',
        subjectId: '',
        subjectType: type
      }));
  }
  deleteItem(type: 'activity' | 'subject', index) {
    if (type === 'subject') {
      this.subSubjects.removeAt(index);
      return;
    }
    this.activities.removeAt(index);
  }
  insertItem(type: 'activity' | 'subject') {
    if (type === 'subject') {
      const size = this.subSubjects.length;
      this.subSubjects.insert(size, this.fb.control(''))
      return;
    }
    const size = this.activities.length;
    this.activities.insert(size, this.fb.control(''));
  }

  addSubject() {
    // this.createSubject.emit()
    const addFormVal = this.addSubjForm.value;
    const processedActivities = this.processArrayFields(
      'activity',
      addFormVal.activities
    );
    const processedSubSubjects = this.processArrayFields(
      'subsubject',
      addFormVal.subSubjects
    );
    const submitData: CreateSubjModel = {
      title: addFormVal.subjectName,
      subSubjects: [...processedActivities, ...processedSubSubjects],
      subjectIcon: '',
      teachersIds: []
    };
    this.createSubject.emit(submitData);
    this.addSubjForm.reset();
  }
  subSubjectsArr = ['Algebra', 'Geometry'];
  subjectsArr = [
    'Mathematics',

    'Science',
    'Health',
    'Handwriting',
    'Physical Education (P.E.)',
    'Art',
    'Music',
    'Instrumental Music – specific instrument',
    'Movement or Eurythmy',
    'Handwork or handcrafts',
    'Life Lab or gardening',
    'Dramatics',
    'Dance',
    'Spanish or other foreign language',
    'Leadership',
    'Special Education Day Class',
    'Resource Program',
    'Speech',
    'Adaptive P.E.',
    'Occupational Therapy',
    'Middle School Subjects',
    'CORE',

    'Reading',
    'Language arts',
    'Speech and Debate',
    'English',
    'Basic Math',
    'Pre-algebra',
    'Consumer Math',
    'Algebra',
    'Geometry',
    'Honors Math in Algebra or Geometry',
    'Life Science',
    'Earth Science',
    'Physical Science',
    'Health',
    'Social Studies',
    'Geography',
    'Ancient Civilizations',
    'Medieval and Renaissance',
    'U.S. History and Government',
    'French / Spanish / Latin',
    'Computer Science or Lab',
    'Art',
    'Home Economics',
    'Woodshop',
    'Metal Shop',
    'Business Technology',
    'Instrumental Music',
    'Band',
    'Choir',
    'Drama',
    'Physical Education',
    'Sports',
    'Special Education Day Class',
    'Resource Program',
    'Speech Therapy',
    'Occupational Therapy'
  ];
  toggleSidePanel() {
    this.closeSidePanel.emit();
  }


  ngOnInit(): void {
  }
  constructor(private fb: FormBuilder) { }
}
