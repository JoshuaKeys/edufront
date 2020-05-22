import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PreviewModel } from '../../models/preview.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'edu-school-logo-question',
  templateUrl: './school-logo-question.component.html',
  styleUrls: ['./school-logo-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolLogoQuestionComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  private subscription: Subscription = new Subscription();
  mForm: FormGroup;
  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<PreviewModel>) { }

  ngOnInit(): void {
    console.log(this.activatedRouteData.next.next)
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
