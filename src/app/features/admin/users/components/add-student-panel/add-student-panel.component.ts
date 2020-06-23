import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'edu-add-student-panel',
  templateUrl: './add-student-panel.component.html',
  styleUrls: ['./add-student-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddStudentPanelComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
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
  }

  // get formControls() {
  //   return this.studentDetailsForm.controls;
  // }
  studentDetailsForm: FormGroup;
  guardianDetailsForm: FormGroup;

  @Output('closePanel') closePanel = new EventEmitter();

  onClosePanel() {
    this.closePanel.emit('');
  }
}
