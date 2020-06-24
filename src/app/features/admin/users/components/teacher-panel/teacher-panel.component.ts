import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'edu-teacher-panel',
  templateUrl: './teacher-panel.component.html',
  styleUrls: ['./teacher-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeacherPanelComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.staffDetailsForm = this.formBuilder.group({
      profile: [{ base64: '', acceptedFile: null }, Validators.required],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      dob: [''],
      sex: [''],
      class: [''],
      schId: [{ value: '', disabled: true }],
      phone: [''],
      email: [''],
      country: [''],
      address: [''],
      state: [''],
      city: [''],
      zip: [''],
      subjects: ['']
    });
    this.assignDefault(this.activeUser);
  }

  // get formControls() {
  //   return this.studentDetailsForm.controls;
  // }
  staffDetailsForm: FormGroup;

  @Output('closePanel') closePanel = new EventEmitter();
  @Input('activeUser') activeUser;
  onClosePanel() {
    this.closePanel.emit('');
  }

  assignDefault(activeUser) {
    if (typeof this.activeUser === 'undefined') {
      return;
    }
    // console.log(typeof this.activeUser);
    // console.log(typeof this.activeUser === 'undefined');
    this.staffDetailsForm.controls.firstName.setValue(activeUser.firstName);
    this.staffDetailsForm.controls.lastName.setValue(activeUser.lastName);
    this.staffDetailsForm.controls.sex.setValue(activeUser.gender);
  }
}
