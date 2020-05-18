import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edu-address-page',
  templateUrl: './address-page.component.html',
  styleUrls: ['./address-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressPageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  navBlock: object;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    console.log('name');
    this.subscription = this.route.data.subscribe(res => {
      this.navBlock = res;
    })
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
