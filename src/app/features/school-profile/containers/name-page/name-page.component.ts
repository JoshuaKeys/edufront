import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../../ngrx/state';
import { setName } from '../../ngrx/actions';

@Component({
  selector: 'edu-name-page',
  templateUrl: './name-page.component.html',
  styleUrls: ['./name-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NamePageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  mForm: FormGroup;
  navBlock: object;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public store: Store<State>,
  ) {
    this.mForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(res => this.navBlock = res);
  }

  addName(): void {
    this.store.dispatch(setName({value: this.mForm.value.name}));
    this.router.navigate([`../${this.navBlock['next']}`], {relativeTo: this.route});
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
