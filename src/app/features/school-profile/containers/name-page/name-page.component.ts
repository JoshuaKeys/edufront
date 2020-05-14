import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'edu-name-page',
  templateUrl: './name-page.component.html',
  styleUrls: ['./name-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NamePageComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  navBlock: object;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(res => {
    this.navBlock = res;
    console.log('navBlock', this.navBlock);
    })
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
