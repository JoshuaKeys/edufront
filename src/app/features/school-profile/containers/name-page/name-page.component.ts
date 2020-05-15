import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
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
  mForm: FormGroup;
  navBlock: object;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private router: Router) {
    this.mForm = this.fb.group({
      name: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.subscription = this.route.data.subscribe(res => {
      this.navBlock = res;
      console.log('navBlock', this.navBlock);
    })
  }

  addName(): void {
    console.log(this.mForm.value.name);
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
