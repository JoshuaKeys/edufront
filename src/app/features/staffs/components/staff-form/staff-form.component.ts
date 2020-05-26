import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ProfilePicModel } from './../../models/profile-pic.model';

interface AddEditFormFieldsModel {
  profilePic: ProfilePicModel;
}
@Component({
  selector: 'edu-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffFormComponent implements OnInit {

  addEditForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.addEditForm = new FormGroup({
      profilePic: new FormControl(null),
      firstName: new FormControl(''),
      middleName: new FormControl(''),
      familyName: new FormControl(''),
      dateOfBirth: new FormControl(''),
      sex: new FormControl(''),
      id: new FormControl(''),
      phone: new FormControl(''),
      country: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl('')
    })
  }
  handleImgUpload(event: ProfilePicModel) {
    this.addEditForm.patchValue({
      profilePic: event
    })
  }
}
