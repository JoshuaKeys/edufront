import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  HostListener,
  Host
} from '@angular/core';

@Component({
  selector: 'edu-security-tab',
  templateUrl: './security-tab.component.html',
  styleUrls: ['./security-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecurityTabComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  //[question, password, none]
  activeSecuritySetting = 'none';

  resetActiveSecuritySetting() {
    this.activeSecuritySetting = 'none';
  }

  setSecuritySetting(param) {
    this.activeSecuritySetting = param;
  }

  isSecuritySetting(param) {
    return param === this.activeSecuritySetting;
  }

  // @HostListener("")
}
