import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  forwardRef,
  ViewEncapsulation,
  Output,
  EventEmitter
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  FormArray,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { CreateSubjModel } from '../../../../shared/models/create-subject.model';
import { SubSubjectModel } from '../../../../shared/models/sub-subject.model';

@Component({
  selector: 'edu-subjects-form',
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
