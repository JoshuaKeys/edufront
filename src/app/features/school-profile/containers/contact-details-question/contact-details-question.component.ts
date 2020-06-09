import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreviewModel } from '../../models/preview.model';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { setContactsData, setPhoneData } from '../../ngrx/actions';

import { selectSchoolContact } from '../../ngrx/selectors';
import { PhoneIconModel } from 'src/app/shared/models/phone-icon.model';

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
  ];
  ngOnInit(): void {
    this.store.select(selectSchoolContact).subscribe(schoolContacts => {
      let contacts: any = {};
      if (!schoolContacts) {
        contacts.email = '';
        contacts.phone = null;
        contacts.website = '';
      } else {
        contacts.email = schoolContacts.email;
        contacts.website = schoolContacts.website;
        const phoneIdx = this.countryIconMap.findIndex(
          countryItem =>
            // `(${countryItem.phonePrefix})${countryItem.phoneNum}` === schoolContacts.phone
            countryItem.phonePrefix === schoolContacts.countryCode
        );
        if (schoolContacts) {
          contacts.phone = {
            ...this.countryIconMap[phoneIdx],
            phoneNum: schoolContacts.phone
          };
        } else {
          contacts.phone = null;
        }
      }

      this.contactForm = new FormGroup({
        phone: new FormControl(contacts.phone, Validators.required),
        email: new FormControl(contacts.email),
        website: new FormControl(contacts.website)
      });
    });
  }
  returnFormFieldFormat(name, el) {
    let value = el.target.value;
    return this.updateFormField({ name, value });
  }
  updateFormField(event: { name: string; value: string }) {
    this.contactForm.patchValue({
      [event.name]: event.value
    });
    this.store.dispatch(
      setContactsData({
        field: event.name,
        value: event.value
      })
    );
  }
  updatePhone(event: PhoneIconModel) {
    this.contactForm.patchValue({
      phone: event
    });
    this.store.dispatch(
      setPhoneData({
        field: 'phone',
        prefix: event.phonePrefix,
        phoneNum: event.phoneNum
      })
    );
    this.store.dispatch(
      setContactsData({
        field: 'phone',
        value: `${event.phoneNum}`
      })
    );
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<PreviewModel>
  ) {}
}
