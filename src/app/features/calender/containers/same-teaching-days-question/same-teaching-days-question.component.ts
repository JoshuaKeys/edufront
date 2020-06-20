import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edu-same-teaching-days-question',
  templateUrl: './same-teaching-days-question.component.html',
  styleUrls: ['./same-teaching-days-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SameTeachingDaysQuestionComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  ngOnInit(): void {}
  goToDaysDefinition() {
    // this.router.navigate(['../', this.activatedRouteData])
  }
  goToTeachingDays() {
    this.router.navigate(['../', this.activatedRouteData.next], {
      relativeTo: this.activatedRoute
    });
  }
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  goToPrepopulatedHolidayList() {}
  goToHolidayList() {}
}
