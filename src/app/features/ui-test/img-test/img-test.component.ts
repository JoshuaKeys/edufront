import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'edu-img-test',
  templateUrl: './img-test.component.html',
  styleUrls: ['./img-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImgTestComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.testForm = this.formBuilder.group({
      f1: [{ base64: '', acceptedFile: null }, Validators.required],
      f2: ['', Validators.required]
    });
  }

  get formControls() {
    return this.testForm.controls;
  }
  testForm: FormGroup;
  confirmEventResults;

  pettyPrint(obj) {
    return JSON.stringify(obj, null, 2);
  }

  onConfirm(param) {
    this.confirmEventResults = param;
  }
  formSubmit() {}
}
