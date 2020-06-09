import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  activeNavIndex = 3;
  progress = 30;
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
      route: '/school-profile/school-name-question'
    },
    {
      icon: 'class-and-groups',
      label: 'Class and Groups',
      route: '/classes-and-groups/classes-in-school'
    },
    {
      icon: 'subjects',
      label: 'Subjects',
      route: '/subjects/subjects-taught'
    },
    {
      icon: 'students',
      label: 'Students',
      route: '/students/students-creation'
    },
    {
      icon: 'staffs',
      label: 'Staff',
      route: '/staffs/staffs-creation'
    },
    {
      icon: 'sections',
      label: 'Sections',
      route: '/sections/create-sections'
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
