import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-classes-shell',
  templateUrl: './classes-shell.component.html',
  styleUrls: ['./classes-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClassesShellComponent implements OnInit {
  sideMenuOptions = [
    { value: 'classes', text: 'Classes', route: '/console/admin/classes' },
  ];
  activeSideMenuOption = { value: 'users', text: 'Users' };
  constructor() { }

  ngOnInit(): void {
  }

  setActiveOption(option) {
    this.activeSideMenuOption = option;
  }
}
