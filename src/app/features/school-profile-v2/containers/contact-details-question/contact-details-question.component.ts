import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreviewModel } from '../../models/preview.model';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { setContactsData } from '../../ngrx/actions';
import { PhoneIconModel } from '../../components/phone-icon-field/phone-icon-field.component';

@Component({
  selector: 'edu-contact-details-question',
  templateUrl: './contact-details-question.component.html',
  styleUrls: ['./contact-details-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsQuestionComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  contactForm: FormGroup;
  countryIconMap = [
    {
      item: 'United States +1',
      icon: 'assets/images/flags/flg-us.svg',
      phonePrefix: '+1',
      phoneNum: ''
    },
    {
      item: 'India +91',
      icon: 'assets/images/flags/flg-in.svg',
      phonePrefix: '+91',
      phoneNum: ''
    },
    {
      item: 'Canada +1',
      icon: 'assets/images/flags/flg-ca.svg',
      phonePrefix: '+1',
      phoneNum: ''
    },
    {
      item: 'United Kingdom +44',
      icon: 'assets/images/flags/flg-uk.svg',
      phonePrefix: '+44',
      phoneNum: ''
    }
  ]
  ngOnInit(): void {
    this.contactForm = new FormGroup({
      phone: new FormControl(null, Validators.required),
      email: new FormControl(''),
      website: new FormControl('')
    })
  }
  updateFormField(event: { name: string, value: string }) {
    console.log(event);
    this.contactForm.patchValue({
      [event.name]: event.value
    })
    this.store.dispatch(setContactsData({
      field: event.name,
      value: event.value
    }))
  }
  updatePhone(event: PhoneIconModel) {
    this.contactForm.patchValue({
      phone: event
    });
    console.log(event);
    this.store.dispatch(setContactsData({
      field: 'phone',
      value: `(${event.phonePrefix})${event.phoneNum}`,

    }))
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<PreviewModel>
  ) { }
}
