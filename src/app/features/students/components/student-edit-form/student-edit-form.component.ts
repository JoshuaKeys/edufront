import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ProfilePicModel } from 'src/app/shared/models/profile-pic.model';
import { PhoneIconModel } from 'src/app/shared/models/phone-icon.model';
import { StudentsStateModel } from '../../models/students-state.model';
import { StudentsXClassesModel } from '../../models/students-x-classes.model';
import { Observable } from 'rxjs';
import { StudentModel } from 'src/app/shared/models/student.model';

@Component({
  selector: 'edu-student-edit-form',
  templateUrl: './student-edit-form.component.html',
  styleUrls: ['./student-edit-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentEditFormComponent implements OnInit {
  @Input() editData: Observable<StudentModel>;
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
  ];

  @Input() studentsXClasses: Observable<StudentsXClassesModel[]>
  @Input() students: StudentModel;
  @Output() onSubmit = new EventEmitter<StudentsStateModel>();
  addEditForm: FormGroup;
  sortedStudentsXClasses: Observable<StudentsXClassesModel[]>;

  constructor() { }

  editStudent() {
    const formValue = this.addEditForm.value;
    formValue.profileDto.profileImage = formValue.profilePic.profileImage
    delete formValue.profilePic;
    console.log(formValue);
    this.onSubmit.emit(formValue)
  }
  ngOnInit(): void {
    this.editData.subscribe(
      editData => {
        const profileDto = editData.profileDto;
        const guardianDto = editData.guardianDetailsDto;
        const countryIdx = this.countryIconMap.findIndex(country => country.id === editData.profileDto.countryId);
        this.addEditForm = new FormGroup({
          profilePic: new FormGroup({
            profileImage: new FormControl(profileDto.profileImage ? { imageUrl: profileDto.profileImage } : null),
          }),
          profileDto: new FormGroup({
            firstName: new FormControl(profileDto.firstName ? profileDto.firstName : ''),
            middleName: new FormControl(profileDto.middleName ? profileDto.middleName : ''),
            familyName: new FormControl(profileDto.lastName ? profileDto.lastName : ''),
            dob: new FormControl(profileDto.dob ? profileDto.dob : ''),
            gender: new FormControl(profileDto.gender ? profileDto.gender : ''),
            id: new FormControl(profileDto.id ? profileDto.id : ''),
            country: new FormControl(this.countryIconMap[countryIdx]),
            city: new FormControl(profileDto.city ? profileDto.city : ''),
            state: new FormControl(profileDto.state ? profileDto.state : ''),
            zipcode: new FormControl(profileDto.zipcode ? profileDto.zipcode : ''),
            address: new FormControl(profileDto.address ? profileDto.address : ''),
            contexts: new FormControl(['STUDENT']),
            classId: new FormControl(profileDto.classId ? profileDto.classId : ''),
            rollNumber: new FormControl(profileDto.rollNumber ? profileDto.rollNumber : ''),
          }),
          guardianDetailsDto: new FormGroup({
            email: new FormControl(guardianDto.email ? guardianDto.email : ''),
            familyName: new FormControl(guardianDto.familyName ? guardianDto.familyName : ''),
            firstName: new FormControl(guardianDto.firstName ? guardianDto.firstName : ''),
            middleName: new FormControl(guardianDto.middleName ? guardianDto.middleName : ''),
            id: new FormControl(guardianDto.id ? guardianDto.id : ''),
            phone: new FormControl(this.countryIconMap[countryIdx]),
            profileId: new FormControl(guardianDto.profileId ? guardianDto.profileId : '')
          })
        })
      }
    )

  }
  setupEditMode() {
  }
  setupCreateMode() {
  }
  handleImgUpload(event: ProfilePicModel) {
    this.addEditForm.controls.profilePic.patchValue({
      profileImage: event
    })
  }
  updatePhone(event: PhoneIconModel) {
    const idx = this.countryIconMap.findIndex(iconMap => iconMap.id === event.id);
    if (idx > -1) {
      this.addEditForm.controls.guardianDto.patchValue({
        phone: { ...this.countryIconMap[idx], phoneNum: event.phoneNum }
      })
    }
  }
  updateCountry(event: PhoneIconModel) {
    const idx = this.countryIconMap.findIndex(iconMap => iconMap.id === event.id);
    if (idx > -1) {
      this.addEditForm.controls.profileDto.patchValue({
        country: this.countryIconMap[idx]
      })
    }
  }
}
