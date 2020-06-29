import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'edu-break-schedule-question',
  templateUrl: './break-schedule-question.component.html',
  styleUrls: ['./break-schedule-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreakScheduleQuestionComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  ngOnInit(): void {
  }
  goNext() {
    this.router.navigate(['../', this.activatedRouteData.next], {relativeTo: this.activatedRoute})
  }
  goToSameBreaks() {
    this.router.navigateByUrl('/calendar/same-break-definition')
  }
  constructor(private router: Router,private activatedRoute: ActivatedRoute) { }
}
