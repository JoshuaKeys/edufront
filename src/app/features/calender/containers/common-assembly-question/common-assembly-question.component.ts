import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edu-common-assembly-question',
  templateUrl: './common-assembly-question.component.html',
  styleUrls: ['./common-assembly-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonAssemblyQuestionComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;

  ngOnInit(): void {
  }
  goUpperNext() {
    this.router.navigateByUrl('/calendar/break-schedule-question')
  }
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) { }
}
