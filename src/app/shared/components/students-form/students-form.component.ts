import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { PhoneIconModel } from 'src/app/shared/models/phone-icon.model';
import { ProfilePicModel } from 'src/app/shared/models/profile-pic.model';
import { Observable } from 'rxjs';
import { StudentsStateModel } from 'src/app/features/students/models/students-state.model';
import { StudentsXClassesModel } from 'src/app/features/students/models/students-x-classes.model';
import { StudentModel } from '../../models/student.model';
import { ClassModel } from '../../models/class.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'edu-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsFormComponent implements OnInit {
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
  @Input() allClasses: Observable<ClassModel[]>;
  @Input() studentsXClasses: Observable<StudentsXClassesModel[]>;
  @Input() students: StudentModel;
  @Output() onSubmit = new EventEmitter<StudentsStateModel>();
  addEditForm: FormGroup;
  sortedStudentsXClasses: Observable<StudentsXClassesModel[]>;
  sortedClasses: Observable<ClassModel[]>;
  constructor() { }

  createStaff() {
    const formValue = this.addEditForm.value;
    formValue.profileDto.profileImage = formValue.profilePic.profileImage;
    delete formValue.profilePic;
    this.onSubmit.emit(formValue);
  }
  log(item) {
    console.log(item);
  }
  ngOnInit(): void {
    this.sortedClasses = this.allClasses.pipe(
      map(classes => {
        return classes.sort((classA, classB) => classA.grade < classB.grade ? -1 : 1)
      })
    )
    this.sortedClasses.subscribe(x => console.log(x, 'hoooooooll'))
    this.studentsXClasses.subscribe(console.log);
    if (!this.students) {
      this.addEditForm = this.setupCreateMode();
    }
  }
  setupCreateMode() {
    return new FormGroup({
      profilePic: new FormGroup({
        profileImage: new FormControl(null)
      }),
      profileDto: new FormGroup({
        firstName: new FormControl(''),
        middleName: new FormControl(''),
        familyName: new FormControl(''),
        dob: new FormControl('2020-02-01'),
        gender: new FormControl('', Validators.required),
        id: new FormControl(''),
        country: new FormControl(this.countryIconMap[0]),
        city: new FormControl(''),
        state: new FormControl(''),
        zipcode: new FormControl(''),
        address: new FormControl(''),
        contexts: new FormControl(['STUDENT']),
        classId: new FormControl('', Validators.required),
        rollNumber: new FormControl('')
      }),
      guardianDetailsDto: new FormGroup({
        email: new FormControl(''),
        familyName: new FormControl(''),
        firstName: new FormControl(''),
        middleName: new FormControl(''),
        id: new FormControl(''),
        phone: new FormControl(this.countryIconMap[0]),
        profileId: new FormControl('')
      })
    });
  }
  handleImgUpload(event: ProfilePicModel) {

    this.addEditForm.controls.profilePic.patchValue({
      profileImage: event
    });
  }
  updatePhone(event: PhoneIconModel) {
    const idx = this.countryIconMap.findIndex(
      iconMap => iconMap.id === event.id
    );
    if (idx > -1) {
      this.addEditForm.controls.guardianDetailsDto.patchValue({
        phone: { ...this.countryIconMap[idx], phoneNum: event.phoneNum }
      });
    }
  }
  updateCountry(event: PhoneIconModel) {
    const idx = this.countryIconMap.findIndex(
      iconMap => iconMap.id === event.id
    );
    if (idx > -1) {
      this.addEditForm.controls.profileDto.patchValue({
        country: this.countryIconMap[idx]
      });
    }
  }
}
