import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'edu-same-periods-for-classes-question',
  templateUrl: './same-periods-for-classes-question.component.html',
  styleUrls: ['./same-periods-for-classes-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SamePeriodsForClassesQuestionComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }
  goNext() {

  }
  
}
