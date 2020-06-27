import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edu-same-periods-per-time',
  templateUrl: './same-periods-per-time.component.html',
  styleUrls: ['./same-periods-per-time.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SamePeriodsPerTimeComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data
  ngOnInit(): void {
  }
  goToUpperNext() {
    this.router.navigateByUrl('/calendar/start-time-of-each-period')
  }
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
}
