import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PreviewModel } from '../../models/preview.model';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IconModel } from '../../components/icon-field/icon-field.component';
import { setAddressData, setCountryIdData } from '../../ngrx/actions';
import { SchoolProfileService } from '../../services/school-profile.service';
import { selectSchoolAddress } from '../../ngrx/selectors';
import { withLatestFrom, first, take } from 'rxjs/operators';
import { SchoolAddressModel } from '../../models/school-address.model';

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
      id: '1c1e29e4-642b-11ea-a762-9bcb0d229311',
      item: 'United States',
      icon: 'assets/images/flags/flg-us.svg'
    },
    {
      id: 'ab53c906-6427-11ea-a761-8b6db09d1095',
      item: 'India',
      icon: 'assets/images/flags/flg-in.svg'
    },
    {
      id: '418bc6b4-642b-11ea-a763-33192cb50cc3',
      item: 'Canada',
      icon: 'assets/images/flags/flg-ca.svg'
    },
    {
      id: '44f9b17e-642d-11ea-a764-d79d3a1df079',
      item: 'United Kingdom',
      icon: 'assets/images/flags/flg-uk.svg'
    }
  ]
  ngOnInit(): void {
    // this.schoolProfService.getCountries().subscribe(console.log)
    let country;
    this.store.select(selectSchoolAddress).subscribe((address) => {
      let formFields: any = {};

      if (!address) {
        formFields = {
          zipCode: '',
          address: '',
          state: '',
          city: '',
        }
        country = this.countryIconMap[0]
      } else {
        let countryIdx = this.countryIconMap.findIndex(iconItem => iconItem.item === address.country);
        country = this.countryIconMap[countryIdx]
        formFields = address;
      }
      this.schoolAddressForm = new FormGroup({
        country: new FormControl(country, Validators.required),
        zipCode: new FormControl(formFields.zipCode, Validators.required),
        address: new FormControl(formFields.address, Validators.required),
        state: new FormControl(formFields.state, Validators.required),
        city: new FormControl(formFields.city, Validators.required)
      });
    });

    this.store.dispatch(setAddressData({ field: 'country', value: country.item }))
    this.store.dispatch(setCountryIdData({ countryId: country.id }))
  }
  updateCountry(value: IconModel) {
    this.schoolAddressForm.patchValue({
      country: value
    })
    this.store.dispatch(setAddressData({ field: 'country', value: value.item }))
    this.store.dispatch(setCountryIdData({ countryId: value.id }))
  }
  updateFormField(event: { name: string, value: string }) {
    this.schoolAddressForm.patchValue({
      [event.name]: event.value
    })
    this.store.dispatch(setAddressData({ field: event.name, value: event.value }))
  }
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<PreviewModel>,
    private schoolProfService: SchoolProfileService,
    private cdRef: ChangeDetectorRef
  ) { }
}
