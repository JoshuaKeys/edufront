import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'edu-security-tab-password',
  templateUrl: './security-tab-password.component.html',
  styleUrls: ['./security-tab-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityTabPasswordComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @Output('backButtonClicked') backButtonClicked = new EventEmitter();
  //valid values [1, 1.1, 1.2, 1.3, 2, 3]
  activeScreenNumber = 1;
  isActiveScreen(param) {
    return this.activeScreenNumber == param;
  }

  backToPasswordTab() {
    console.log('emitting  backButtonClicked');
    this.backButtonClicked.emit();
  }
}
