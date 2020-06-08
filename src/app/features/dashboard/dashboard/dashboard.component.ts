import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  activeNavIndex = 2;
  progress = 20;
  trackerState(index) {
    if (index > this.activeNavIndex) {
      return '';
    } else if (index < this.activeNavIndex) {
      return 'complete';
    } else {
      return 'active';
    }
  }
  getIconPath(index) {
    if (index > this.activeNavIndex) {
      return this.dasboardNavConfig[index].icon;
    } else if (index < this.activeNavIndex) {
      return 'complete';
    } else {
      return `${this.dasboardNavConfig[index].icon}-active`;
    }
  }
  dasboardNavConfig = [
    {
      icon: 'school-profile',
      label: 'School Profile',
      route: '/school-profile'
    },
    {
      icon: 'class-and-groups',
      label: 'Class and Groups',
      route: '/classes-and-groups'
    },
    {
      icon: 'subjects',
      label: 'Subjects',
      route: '/subjects'
    },
    {
      icon: 'students',
      label: 'Students',
      route: '/students'
    },
    {
      icon: 'staffs',
      label: 'Staff',
      route: '/staffs'
    },
    {
      icon: 'sections',
      label: 'Sections',
      route: '/sections'
    },
    {
      icon: 'calendar',
      label: 'Calendar',
      route: '/calendar'
    },
    {
      icon: 'timetable',
      label: 'Timetable',
      route: '/timetable'
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
