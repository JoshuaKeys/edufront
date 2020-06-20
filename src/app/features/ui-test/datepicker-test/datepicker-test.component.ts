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
      f1: ['2012-01-01', Validators.required],
      f2: ['', Validators.required],
      f3: ['', Validators.required],
      f4: ['', Validators.required],
      f5: ['2012-01-01', Validators.required]
    });
  }

  get formControls() {
    return this.testForm.controls;
  }
  testForm: FormGroup;
  formSubmit() {}
  confirmEventResults;
}
