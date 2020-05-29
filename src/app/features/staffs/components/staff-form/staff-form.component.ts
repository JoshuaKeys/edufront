import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProfilePicModel } from './../../models/profile-pic.model';
import { IconModel } from 'src/app/shared/components/icon-field/icon-field.component';
import { PhoneIconModel } from 'src/app/shared/models/phone-icon.model';
import { Observable } from 'rxjs';
import { ClassModel } from 'src/app/shared/models/class.model';
import { SubjectModel } from 'src/app/shared/models/_subject.model';
import { SelectableSubjectModel } from 'src/app/shared/models/selectable-subject.model';
import { SubjectClassesAssociation } from '../../models/subject-classes-association.model';

interface AddEditFormFieldsModel {
  profilePic: ProfilePicModel;
}
@Component({
  selector: 'edu-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffFormComponent implements OnInit {
  countryIconMap = [
    {
      id: '1c1e29e4-642b-11ea-a762-9bcb0d229311',
      item: 'United States',
      icon: 'assets/images/flags/flg-us.svg',
      phonePrefix: '+1'
    },
    {
      id: 'ab53c906-6427-11ea-a761-8b6db09d1095',
      item: 'India',
      icon: 'assets/images/flags/flg-in.svg',
      phonePrefix: '+91'
    },
    {
      id: '418bc6b4-642b-11ea-a763-33192cb50cc3',
      item: 'Canada',
      icon: 'assets/images/flags/flg-ca.svg',
      phonePrefix: '+1'
    },
    {
      id: '44f9b17e-642d-11ea-a764-d79d3a1df079',
      item: 'United Kingdom',
      icon: 'assets/images/flags/flg-uk.svg',
      phonePrefix: '+44'
    }
  ]

  @Input() classes: Observable<ClassModel[]>;
  @Input() subjects: Observable<SubjectModel[]>;
  @Input() classesAndSubjects: SubjectClassesAssociation[];
  @Output() selectSubject = new EventEmitter<string>();
  @Output() unSelectSubject = new EventEmitter<string>();
  @Output() classClicked = new EventEmitter<ClassModel>();
  @Output() onCreateStaff = new EventEmitter();
  addEditForm: FormGroup;
  constructor() { }
  createStaff() {
    this.onCreateStaff.emit(this.addEditForm.value)
  }
  ngOnInit(): void {
    this.addEditForm = new FormGroup({
      profilePic: new FormControl(null),
      firstName: new FormControl(''),
      middleName: new FormControl(''),
      familyName: new FormControl(''),
      dob: new FormControl(''),
      sex: new FormControl(''),
      id: new FormControl(''),
      phone: new FormControl(this.countryIconMap[0]),
      country: new FormControl(this.countryIconMap[0]),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl('')
    })
  }
  handleImgUpload(event: ProfilePicModel) {
    console.log(event);
    this.addEditForm.patchValue({
      profilePic: event
    })
  }
  updatePhone(event: PhoneIconModel) {
    const idx = this.countryIconMap.findIndex(iconMap => iconMap.id === event.id);
    if (idx > -1) {
      this.addEditForm.patchValue({
        phone: this.countryIconMap[idx]
      })
    }
  }
  updateCountry(event: PhoneIconModel) {
    const idx = this.countryIconMap.findIndex(iconMap => iconMap.id === event.id);
    if (idx > -1) {
      this.addEditForm.patchValue({
        country: this.countryIconMap[idx]
      })
    }
  }
  onSelectSubject(subjectId: string) {
    this.selectSubject.emit(subjectId)
  }
  onUnSelectSubject(subjectId: string) {
    this.unSelectSubject.emit(subjectId)
  }
  onClassClicked(classItem: ClassModel) {
    this.classClicked.emit(classItem);
  }
}
