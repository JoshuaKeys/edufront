import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'edu-console-header',
  templateUrl: './console-header.component.html',
  styleUrls: ['./console-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleHeaderComponent implements OnInit {
  @Input() title: string;
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
  constructor() { }
  isActiveOption(option) {
    return option.value === this.activeSideMenuOption.value;
  }

  isActiveModal(param) {
    return this.activeModalOption === param;
  }

  setActiveModal(param) {
    this.activeModalOption = param;
  }
  ngOnInit(): void {
  }

}
