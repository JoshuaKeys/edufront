import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'edu-profile-settings-main',
  templateUrl: './profile-settings-main.component.html',
  styleUrls: ['./profile-settings-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileSettingsMainComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  menuOptions = ['Profile', 'Security', 'Email Preferences'];
  activeMenu = this.menuOptions[0];
  @Output('close') closeModalEvent = new EventEmitter();

  setActiveMenu(option) {
    this.activeMenu = option;
  }
  isActiveMenu(option) {
    return this.activeMenu == option;
  }

  closeModal() {
    this.closeModalEvent.emit();
  }
}
