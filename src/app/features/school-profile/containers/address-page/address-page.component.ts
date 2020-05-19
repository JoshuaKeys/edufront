import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { State } from '../../ngrx/state';
import { setAddress } from '../../ngrx/actions';
import { addressModel } from '../../models/adress.model';
import { debounceTime, distinctUntilChanged, first } from 'rxjs/operators';
import { selectorSchoolAddress } from '../../ngrx/selectors';

@Component({
  selector: 'edu-address-page',
  templateUrl: './address-page.component.html',
  styleUrls: ['./address-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  mForm: FormGroup;
  navBlock: object;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              public store: Store<State>) {

    this.mForm = this.fb.group({
      country: ['', Validators.required],
      zipcode: ['', Validators.required],
      address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required]
    });
    this.mForm.controls['country'].setValue('India',{onlySelf: true});

    this.subscription.add(
      this.mForm.valueChanges.pipe(
        debounceTime(200),
        distinctUntilChanged(),
      ).subscribe((input: addressModel) => this.store.dispatch(setAddress({value: input})))
    );
  }

  ngOnInit(): void {
    this.subscription.add(this.store.select(selectorSchoolAddress)
      .pipe(first())
      .subscribe(
      (address: addressModel) => {
        if (address) {
          this.mForm.get('country').setValue(address.country);
          this.mForm.get('zipcode').setValue(address.zipcode);
          this.mForm.get('address').setValue(address.address);
          this.mForm.get('state').setValue(address.state);
          this.mForm.get('city').setValue(address.city);
        }
    }));
    this.subscription.add(this.route.data.subscribe(res => this.navBlock = res));
  }

  onNext() {
    this.router.navigate([`../${this.navBlock['next']}`], {relativeTo: this.route});
  }

  onPrevious() {
    this.router.navigate([`../${this.navBlock['previous']}`], {relativeTo: this.route});
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
