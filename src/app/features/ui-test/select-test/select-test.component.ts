import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'edu-select-test',
  templateUrl: './select-test.component.html',
  styleUrls: ['./select-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectTestComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {}

  modelTest = 4;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      f1: [2, Validators.required],
      f2: [2, Validators.required],
      f3: [4, Validators.required]
    });
  }
  f1model;

  get formControls() {
    return this.loginForm.controls;
  }
  loginForm: FormGroup;
  isSubmitted = false;
  updatedValue;

  log(param) {
    console.log(param);
  }

  toggleF1() {
    if (this.formControls.f1.disabled) {
      this.formControls.f1.enable();
    } else {
      this.formControls.f1.disable();
    }
  }

  formSubmit() {
    console.log(this.formControls);
  }

  updateValue(val) {
    this.updatedValue = val;
  }

  setDisplayValue(arr) {
    // console.log(arr);
    let displayValue = '';
    let temp = arr
      .map(number => {
        let suffix;
        if (typeof number === 'string' && number.toLowerCase() === 'all') {
          return `${number}`;
        }

        if (number == 1) {
          suffix = 'st';
        } else if (number == 2) {
          suffix = 'nd';
        } else if (number == 3) {
          suffix = 'rd';
        } else {
          suffix = 'th';
        }
        return `${number}${suffix}`;
      })
      .reduce((a, b) => `${a},${b}`);
    if (arr.length == 1 && arr[0] == '') {
      displayValue = '';
    } else {
      displayValue = `${temp} period`;
    }
    // }
    return displayValue;
  }

  options = [
    { value: 'all', display: 'All', state: '' },
    { value: 1, display: 'P1', state: '' },
    { value: 2, display: 'P2', state: '' },
    { value: 3, display: 'P3', state: '' },
    { value: 4, display: 'P4', state: '' },
    { value: 5, display: 'P5', state: '' },
    { value: 6, display: 'P6', state: '' },
    { value: 7, display: 'P7', state: '' },
    { value: 8, display: 'P8', state: '' }
  ];
}
