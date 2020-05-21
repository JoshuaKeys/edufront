import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edu-logo-question-page',
  templateUrl: './logo-question-page.component.html',
  styleUrls: ['./logo-question-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoQuestionPageComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  mForm: FormGroup;
  navBlock: object;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.subscription.add(this.route.data.subscribe(res => {
      this.navBlock = res;
    }));
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
