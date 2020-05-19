import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { setAddress, setContacts } from '../../ngrx/actions';
import { addressModel } from '../../models/adress.model';
import { Store } from '@ngrx/store';
import { State } from '../../ngrx/state';

@Component({
  selector: 'edu-contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  mForm: FormGroup;
  navBlock: object;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router,
              public store: Store<State>) {
    this.mForm = this.fb.group({
      phoneNo: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      website: ['', Validators.required]
    });

    this.subscription.add(
      this.mForm.valueChanges.pipe(
        debounceTime(200),
        distinctUntilChanged(),
      ).subscribe((input: addressModel) => this.store.dispatch(setContacts({value: input})))
    );
  }

  ngOnInit(): void {
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
