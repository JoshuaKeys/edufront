import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from '../../ngrx/state';
import { selectorSchoolAddress, selectorSchoolContacts, selectorSchoolLogo, selectorSchoolName } from '../../ngrx/selectors';
import { saveSchoolProfile } from '../../ngrx/actions';


@Component({
  selector: 'edu-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  navBlock: object;
  schoolName$: Observable<any>;
  schoolAddress$: Observable<any>;
  schoolContacts$: Observable<any>;
  schoolLogo$: Observable<any>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public store: Store<State>) { }

  ngOnInit(): void {
    this.schoolName$ = this.store.select(selectorSchoolName);
    this.schoolAddress$ = this.store.select(selectorSchoolAddress);
    this.schoolContacts$ = this.store.select(selectorSchoolContacts);
    this.schoolLogo$ = this.store.select(selectorSchoolLogo);
    this.subscription.add(this.route.data.subscribe(res => this.navBlock = res));
  }

  onNext() {
    this.router.navigate([`../${this.navBlock['next']}`], {relativeTo: this.route});
  }

  onPrevious() {
    this.router.navigate([`../${this.navBlock['previous']}`], {relativeTo: this.route});
  }

  moveto(path: string): void {
    this.router.navigate([`/school-profile/${path}`]);
  }

  saveSchool() {
    this.store.dispatch(saveSchoolProfile());
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
