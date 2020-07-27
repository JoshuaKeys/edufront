import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-classes-shell',
  templateUrl: './classes-shell.component.html',
  styleUrls: ['./classes-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassesShellComponent implements OnInit {
  sideMenuOptions = [
    // { value: 'home', text: 'Home', route: '/admin/home' },
    { value: 'classes', text: 'Classes', route: '/console/classes' },
    // { value: 'users', text: 'Users', route: '/admin/users' },
    // { value: 'assessment', text: 'Assessment', route: '/admin/assessment' },
    // { value: 'course', text: 'Course', route: '/admin/course' },
    // { value: 'files', text: 'My Files', route: '/admin/files' },
    // { value: 'results', text: 'Results', route: '/admin/results' }
  ];
  activeSideMenuOption = { value: 'users', text: 'Users' };
  constructor() { }

  ngOnInit(): void {
  }

  setActiveOption(option) {
    this.activeSideMenuOption = option;
  }
}
