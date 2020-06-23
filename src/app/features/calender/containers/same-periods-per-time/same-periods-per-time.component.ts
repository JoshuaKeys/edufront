import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  constructor(private activatedRoute: ActivatedRoute) { }
}
