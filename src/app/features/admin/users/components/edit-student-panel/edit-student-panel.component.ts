import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  Input,
  EventEmitter
} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'edu-edit-student-panel',
  templateUrl: './edit-student-panel.component.html',
  styleUrls: ['./edit-student-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditStudentPanelComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    console.log('oninit');
    this.studentDetailsForm = this.formBuilder.group({
      profile: [{ base64: '', acceptedFile: null }, Validators.required],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      dob: [''],
      sex: [''],
      class: [''],
      schId: [{ value: '', disabled: true }],
      country: [''],
      address: [''],
      state: [''],
      city: [''],
      zip: ['']
    });

    this.guardianDetailsForm = this.formBuilder.group({
      firstName2: [''],
      middleName2: [''],
      lastName2: [''],
      phone: [''],
      email: ['']
    });

    this.securityDetailsForm = this.formBuilder.group({
      username: [''],
      password: [''],
      question1: [''],
      question2: ['']
    });

    this.assignDefault(this.activeUser);
  }

  // get formControls() {
  //   return this.studentDetailsForm.controls;
  // }

  activeTab = 'Profile';
  studentDetailsForm: FormGroup;
  guardianDetailsForm: FormGroup;
  securityDetailsForm: FormGroup;
  @Input('activeUser') activeUser;
  @Output('closePanel') closePanel = new EventEmitter();

  setActiveTab(tab) {
    this.activeTab = tab;
  }
  isActiveTab(tab) {
    return this.activeTab === tab;
  }
  onClosePanel() {
    this.closePanel.emit('');
  }

  assignDefault(activeUser) {
    this.studentDetailsForm.controls.firstName.setValue(activeUser.firstName);
    this.studentDetailsForm.controls.lastName.setValue(activeUser.lastName);
    this.studentDetailsForm.controls.class.setValue(activeUser.class);
    this.studentDetailsForm.controls.sex.setValue(activeUser.gender);
  }

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
}
