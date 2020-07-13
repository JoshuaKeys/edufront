import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { CreateSubjModel } from 'src/app/shared/models/create-subject.model';
import { SubSubjectModel } from 'src/app/shared/models/sub-subject.model';

// TODO: we have to think on making it generic
// there are dependent components, which are not letting us do it at the moment
@Component({
  selector: 'edu-timetable-subjects-form',
  templateUrl: './subjects-form.component.html',
  styleUrls: ['./subjects-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectsFormComponent implements OnInit {
  @Output() createSubject = new EventEmitter<CreateSubjModel>();
  addSubjForm = this.fb.group({
    subjectName: ['', Validators.required],
    subSubjects: this.fb.array([this.fb.control('')]),
    activities: this.fb.array([this.fb.control('')])
  });

  onSubmit() {
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
    // console.log('onsubmit');
    this.addSubjForm.reset();

    while (this.subSubjects.controls.length > 1) {
      this.subSubjects.removeAt(1);
    }

    while (this.activities.controls.length > 1) {
      this.activities.removeAt(1);
    }
    // this.subSubjects.insert(item.pos + 1, this.fb.control(''));
    // this.addSubjForm.patchValue({
    //   subSubjects: this.fb.array([this.fb.control('')]),
    //   activities: this.fb.array([this.fb.control('')])
    // });
    // this.addSubjForm.controls.subSubjects.setValue(
    //   this.fb.array([this.fb.control('')])
    // );
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
  ngOnInit(): void {}
  insertItem(item: { type: string; pos: number }) {
    if (item.type === 'subject') {
      this.subSubjects.insert(item.pos + 1, this.fb.control(''));
      return;
    }
    this.activities.insert(item.pos + 1, this.fb.control(''));
  }
  removeItem(item: { type: string; pos: number }) {
    if (item.type === 'subject') {
      this.subSubjects.removeAt(item.pos);
      return;
    }
    this.activities.removeAt(item.pos);
  }
  get subSubjects() {
    return this.addSubjForm.get('subSubjects') as FormArray;
  }
  get activities() {
    return this.addSubjForm.get('activities') as FormArray;
  }

  constructor(private fb: FormBuilder) {}
}
