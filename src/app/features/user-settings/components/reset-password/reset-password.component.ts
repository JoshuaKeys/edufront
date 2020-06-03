import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'edu-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      question: ['', Validators.required],
      answer: ['', Validators.required]
    });
  }

  get formControls() {
    return this.registrationForm.controls;
  }
  registrationForm: FormGroup;

  formSubmit() {}

  //valid [1,2,3]
  activeSteps = 3;
  isActiveStep(param) {
    return this.activeSteps === param;
  }
}
