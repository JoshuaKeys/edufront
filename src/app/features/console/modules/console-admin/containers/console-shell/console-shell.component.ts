import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-console-shell',
  templateUrl: './console-shell.component.html',
  styleUrls: ['./console-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleShellComponent implements OnInit {
  sideMenuOptions = [
    // { value: 'home', text: 'Home', route: '/admin/home' },
    { value: 'calendar', text: 'Calendar', route: '/console/admin/calendar' },
    { value: 'classes', text: 'Classes', route: '/console/admin/classes' },
    // { value: 'users', text: 'Users', route: '/admin/users' },
    // { value: 'assessment', text: 'Assessment', route: '/admin/assessment' },
    // { value: 'course', text: 'Course', route: '/admin/course' },
    // { value: 'files', text: 'My Files', route: '/admin/files' },
    // { value: 'results', text: 'Results', route: '/admin/results' }
  ];
  activeSideMenuOption = { value: 'users', text: 'Users' };
  constructor() { }

  ngOnInit(): void { }

  setActiveOption(option) {
    this.activeSideMenuOption = option;
  }
  isActiveOption(option) {
    return option.value === this.activeSideMenuOption.value;
  }
}
