import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-profile-deactivate-modal',
  templateUrl: './profile-deactivate-modal.component.html',
  styleUrls: ['./profile-deactivate-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileDeactivateModalComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  activeStep = 1; //theres 1 - 3 for the different pages check the ngfor

  user: string;
  isActiveStep(param) {
    return param === this.activeStep;
  }
  setActiveStep(param) {
    this.activeStep = param;
  }
}
