import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { PhoneIconModel } from 'src/app/shared/models/phone-icon.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { FormControl, FormGroup } from '@angular/forms';
import { SubjectModel } from 'src/app/shared/models/_subject.model';
import { Observable } from 'rxjs';
import { SubjectClassesAssociation } from '../../models/subject-classes-association.model';
import { ProfilePicModel } from 'src/app/shared/models/profile-pic.model';

@Component({
  selector: 'edu-staff-edit-form',
  templateUrl: './staff-edit-form.component.html',
  styleUrls: ['./staff-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffEditFormComponent implements OnInit {
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
  @Input() editState = new EventEmitter();
  addEditForm: FormGroup;
  constructor() { }
  createStaff() {
    this.onCreateStaff.emit(this.addEditForm.value);
  }
  ngOnInit(): void {
    this.editState.subscribe(editState => {
      if (editState) {
        console.log(editState)
        const countryIdx = this.countryIconMap.findIndex(country => {
          return editState.profileDto.countryId === country.id
        });
        console.log(countryIdx)
        this.addEditForm = new FormGroup({
          profilePic: new FormControl(null),
          firstName: new FormControl(editState.profileDto.firstName ? editState.profileDto.firstName : ''),
          middleName: new FormControl(editState.profileDto.middleName ? editState.profileDto.middleName : ''),
          familyName: new FormControl(editState.profileDto.lastName ? editState.profileDto.lastName : ''),
          dob: new FormControl(editState.profileDto.dob ? editState.profileDto.dob : ''),
          sex: new FormControl(editState.profileDto.gender ? editState.profileDto.gender : ''),
          id: new FormControl(editState.profileDto.id ? editState.profileDto.id : ''),
          phone: new FormControl(this.countryIconMap[countryIdx]),
          country: new FormControl(this.countryIconMap[countryIdx]),
          city: new FormControl(editState.profileDto.city ? editState.profileDto.city : ''),
          state: new FormControl(editState.profileDto.state ? editState.profileDto.state : ''),
          zip: new FormControl(editState.profileDto.zip ? editState.profileDto.zip : ''),
          email: new FormControl(editState.profileDto.email ? editState.profileDto.email : ''),
          address: new FormControl(editState.profileDto.address ? editState.profileDto.address : ''),
        });
      }
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
        phone: { ...this.countryIconMap[idx], phoneNum: event.phoneNum }
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
