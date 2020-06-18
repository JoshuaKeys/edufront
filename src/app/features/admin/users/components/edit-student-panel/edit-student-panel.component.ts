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
}
