import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
      id: 'ab53c906-6427-11ea-a761-8b6db09d1095',
      item: 'India +91',
      phonePrefix: '+91',
      icon: 'assets/images/flags/flg-in.svg'
    },
    {
      id: '1c1e29e4-642b-11ea-a762-9bcb0d229311',
      item: 'United States +1',
      phonePrefix: '+1',
      icon: 'assets/images/flags/flg-us.svg'
    },
    {
      id: '418bc6b4-642b-11ea-a763-33192cb50cc3',
      item: 'Canada +1',
      phonePrefix: '+1',
      icon: 'assets/images/flags/flg-ca.svg'
    },
    {
      id: '44f9b17e-642d-11ea-a764-d79d3a1df079',
      item: 'United Kingdom +44',
      phonePrefix: '+44',
      icon: 'assets/images/flags/flg-uk.svg'
    }
  ];
  ngOnInit(): void {
    this.store.select(selectSchoolContact).subscribe(schoolContacts => {
      console.log(schoolContacts)
      let contacts: any = {};
      if (!schoolContacts) {
        contacts.email = '';
        contacts.phone = null;
        contacts.website = '';
      } else {
        contacts.email = schoolContacts.email;
        contacts.website = schoolContacts.website;
        const phoneIdx = this.countryIconMap.findIndex(
          countryItem => countryItem.id === schoolContacts.id
        );
        contacts.phone = {
          ...this.countryIconMap[phoneIdx],
          phoneNum: schoolContacts.phone ? schoolContacts.phone.phoneNum : null
        };
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
  goToDashboard() {
    this.router.navigateByUrl('/dashboard')
  }
  updatePhone(event: PhoneIconModel) {
    console.log(event)
    this.contactForm.patchValue({
      phone: event
    });
    this.store.dispatch(
      setPhoneData({
        field: 'phone',
        prefix: event.phonePrefix,
        phoneNum: event.phoneNum,
        id: event.id
      })
    );
    console.log(event);
    // this.store.dispatch(
    //   setContactsData({
    //     field: 'phone',
    //     value: `${event.phoneNum}`,

    //   })
    // );
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<PreviewModel>,
    private router: Router
  ) { }
}
