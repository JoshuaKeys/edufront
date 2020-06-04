import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'edu-datepicker-test',
  templateUrl: './datepicker-test.component.html',
  styleUrls: ['./datepicker-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerTestComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.testForm = this.formBuilder.group({
      f1: ['01/02/20', Validators.required]
    });
  }

  get formControls() {
    return this.testForm.controls;
  }
  testForm: FormGroup;
  formSubmit() {}
  confirmEventResults;
}
