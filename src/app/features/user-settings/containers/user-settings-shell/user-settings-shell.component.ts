import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'edu-user-settings-shell',
  templateUrl: './user-settings-shell.component.html',
  styleUrls: ['./user-settings-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsShellComponent implements OnInit {
  @Output('close') close = new EventEmitter();

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  closePopover() {
    this.close.emit();
  }

  activeSideMenuOption = { value: 'users', text: 'Users' };
  sideMenuOptions = [
    { value: 'home', text: 'Home' },
    { value: 'classes', text: 'Classes' },
    { value: 'users', text: 'Users' },
    { value: 'assessment', text: 'Assessment' },
    { value: 'course', text: 'Course' },
    { value: 'files', text: 'My Files' },
    { value: 'results', text: 'Results' }
  ];

  modalOptions = { none: 'none', profile: 'profile', school: 'school' };
  activeModalOption = this.modalOptions.none;

  setActiveOption(option) {
    this.activeSideMenuOption = option;
  }

  isActiveOption(option) {
    return option.value === this.activeSideMenuOption.value;
  }

  isActiveModal(param) {
    return this.activeModalOption === param;
  }

  setActiveModal(param) {
    this.activeModalOption = param;
  }

  closeModal() {
    this.activeModalOption = this.modalOptions.none;
  }

  // openProfileSettings() {
  //   this.activeModalOption = this.modalOptions.profile;
  // }
  // openSchoolSettings() {
  //   this.activeModalOption = this.modalOptions.school;
  // }
}
