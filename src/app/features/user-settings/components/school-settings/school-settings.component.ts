import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'edu-school-settings',
  templateUrl: './school-settings.component.html',
  styleUrls: ['./school-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolSettingsComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.userDetailForm = this.formBuilder.group({
      schName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      website: ['', Validators.required],
      image: ['', Validators.required],

      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required]
    });
  }

  get formControls() {
    return this.userDetailForm.controls;
  }
  userDetailForm: FormGroup;

  @Output('close') closeModalEvent = new EventEmitter();

  closeModal() {
    console.log('CLOSIN!');
    this.closeModalEvent.emit();
  }

  formSubmit() {}
}
