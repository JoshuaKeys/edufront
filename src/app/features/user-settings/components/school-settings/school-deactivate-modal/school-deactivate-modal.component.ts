import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'edu-school-deactivate-modal',
  templateUrl: './school-deactivate-modal.component.html',
  styleUrls: ['./school-deactivate-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolDeactivateModalComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  activeStep = 1; //theres 1 - 2 for the different pages check the ngfor
  pwError = true;
  user: string;
  isActiveStep(param) {
    return param === this.activeStep;
  }
  setActiveStep(param) {
    this.activeStep = param;
  }
}
