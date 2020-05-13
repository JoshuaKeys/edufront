import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edu-school-profile-page',
  templateUrl: './school-profile-page.component.html',
  styleUrls: ['./school-profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolProfilePageComponent implements OnInit, OnDestroy {
  navBlock: object;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(res => {
    this.navBlock = res;
    console.log('navBlock', this.navBlock);
  });
}

  onNext() {
    this.router.navigate([`../${this.navBlock['next']}`], {relativeTo: this.route});
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
