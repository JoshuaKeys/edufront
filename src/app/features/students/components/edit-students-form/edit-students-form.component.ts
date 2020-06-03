import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfilePicModel } from 'src/app/shared/models/profile-pic.model';
import { StudentsStateModel } from '../../models/students-state.model';
import { StudentsXClassesModel } from '../../models/students-x-classes.model';
import { Observable } from 'rxjs';
import { StudentModel } from '../../models/student.model';
import { PhoneIconModel } from 'src/app/shared/models/phone-icon.model';

@Component({
  selector: 'edu-edit-students-form',
  templateUrl: './edit-students-form.component.html',
  styleUrls: ['./edit-students-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditStudentsFormComponent implements OnInit {
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
  @Input() studentsXClasses: Observable<StudentsXClassesModel[]>
  @Input() student: StudentModel;
  @Input() students: StudentModel;
  @Output() onSubmit = new EventEmitter<StudentsStateModel>();
  addEditForm: FormGroup;
  constructor() { }
  editStudent() {
    const formValue = JSON.parse(JSON.stringify(this.addEditForm.value));
    formValue.profileDto.profileImgObj = formValue.profilePic.profileImage

    delete formValue.profilePic;
    this.onSubmit.emit(formValue)
  }
  ngOnInit(): void {
    this.addEditForm = this.setupEditMode();
  }
  setupEditMode() {
    return new FormGroup({
      profilePic: new FormGroup({
        profileImage: new FormControl(this.student.profileDto ? this.student.profileDto.profileImage : ''),
      }),
      profileDto: new FormGroup({
        firstName: new FormControl(this.student.profileDto ? this.student.profileDto.firstName : ''),
        middleName: new FormControl(this.student.profileDto ? this.student.profileDto.middleName : ''),
        familyName: new FormControl(this.student.profileDto ? this.student.profileDto.firstName : ''),
        dob: new FormControl(this.student.profileDto ? this.student.profileDto.dob : ''),
        gender: new FormControl(this.student.profileDto ? this.student.profileDto.gender : ''),
        id: new FormControl(this.student.profileDto ? this.student.profileDto.id : ''),
        country: new FormControl(this.countryIconMap[0]),
        city: new FormControl(this.student.profileDto ? this.student.profileDto.city : ''),
        state: new FormControl(this.student.profileDto ? this.student.profileDto.state : ''),
        zipcode: new FormControl(this.student.profileDto ? this.student.profileDto.zipcode : ''),
        address: new FormControl(this.student.profileDto ? this.student.profileDto.address : ''),
        contexts: new FormControl(['STUDENT']),
        classId: new FormControl(this.student.profileDto ? this.student.profileDto.classId : ''),
        rollNumber: new FormControl(this.student.profileDto ? this.student.profileDto.rollNumber : ''),

      }),
      guardianDto: new FormGroup({
        email: new FormControl(this.student.guardianDetailsDto ? this.student.guardianDetailsDto.email : ''),
        familyName: new FormControl(this.student.guardianDetailsDto ? this.student.guardianDetailsDto.familyName : ''),
        firstName: new FormControl(this.student.guardianDetailsDto ? this.student.guardianDetailsDto.firstName : ''),
        middleName: new FormControl(this.student.guardianDetailsDto ? this.student.guardianDetailsDto.middleName : ''),
        id: new FormControl(this.student.guardianDetailsDto ? this.student.guardianDetailsDto.id : ''),
        phone: new FormControl(this.countryIconMap[0]),
        profileId: new FormControl(this.student.guardianDetailsDto ? this.student.guardianDetailsDto.profileId : '')
      })
    })

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
