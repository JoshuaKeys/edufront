import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreviewModel } from '../../models/preview.model';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IconModel } from '../../components/icon-field/icon-field.component';
import { setAddressData } from '../../ngrx/actions';

@Component({
  selector: 'edu-school-address-question',
  templateUrl: './school-address-question.component.html',
  styleUrls: ['./school-address-question.component.scss'],
})
export class SchoolAddressQuestionComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  schoolAddressForm: FormGroup;
  validity: boolean;
  countryIconMap = [
    {
      item: 'United States',
      icon: 'assets/images/flags/flg-us.svg'
    },
    {
      item: 'India',
      icon: 'assets/images/flags/flg-in.svg'
    },
    {
      item: 'Canada',
      icon: 'assets/images/flags/flg-ca.svg'
    },
    {
      item: 'United Kingdom',
      icon: 'assets/images/flags/flg-uk.svg'
    }
  ]
  ngOnInit(): void {
    this.schoolAddressForm = new FormGroup({
      country: new FormControl(this.countryIconMap[0], Validators.required),
      zipCode: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required)
    })
    this.store.dispatch(setAddressData({ field: 'country', value: this.countryIconMap[0].item }))
  }
  updateCountry(value: IconModel) {
    this.schoolAddressForm.patchValue({
      country: value
    })
    this.store.dispatch(setAddressData({ field: 'country', value: value.item }))
  }
  updateFormField(event: { name: string, value: string }) {
    this.schoolAddressForm.patchValue({
      [event.name]: event.value
    })
    this.store.dispatch(setAddressData({ field: event.name, value: event.value }))
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<PreviewModel>
  ) { }
}
