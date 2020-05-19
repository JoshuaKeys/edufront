import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
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
  private subscription: Subscription = new Subscription();
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
    this.subscription.add(this.mForm.get('name').valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
      ).subscribe(name=> this.store.dispatch(setName({value: name})) )
    );
  }

  ngOnInit(): void {
    this.subscription.add(this.route.data.subscribe(res => this.navBlock = res));
  }

  addName(): void {
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
