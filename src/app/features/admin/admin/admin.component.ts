import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'edu-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {
  @Output('close') close = new EventEmitter();

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  closePopover() {
    this.close.emit();
  }

  activeSideMenuOption = { value: 'users', text: 'Users' };
  sideMenuOptions = [
    { value: 'home', text: 'Home', route: '/admin/home' },
    { value: 'classes', text: 'Classes', route: '/admin/classes' },
    { value: 'users', text: 'Users', route: '/admin/users' },
    { value: 'assessment', text: 'Assessment', route: '/admin/assessment' },
    { value: 'course', text: 'Course', route: '/admin/course' },
    { value: 'files', text: 'My Files', route: '/admin/files' },
    { value: 'results', text: 'Results', route: '/admin/results' }
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
