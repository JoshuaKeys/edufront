import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { DashboardStateModel } from '../../models/dashboard-state.model';
import { selectDashboardState } from '../../ngrx/selectors';
import { selectUserModalState } from '../../ngrx/actions';

@Component({
  selector: 'edu-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  activeNavIndex: number;
  progress: number;
  selectModalState: Observable<any>;
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
      route: '/calendar/dates-of-academic-year'
    },
    {
      icon: 'timetable',
      label: 'Timetable',
      route: '/timetable'
    }
  ];
  onContinue() {
    this.store.dispatch(selectUserModalState());
  }
  constructor(private store: Store<DashboardStateModel>) { }

  ngOnInit(): void {
    this.selectModalState = this.store.select(selectDashboardState)
    this.store.select(selectDashboardState).subscribe(
      dashboardState => {
        this.activeNavIndex = dashboardState.activeNavIndex
        this.progress = dashboardState.progress
      }
    )
  }
}
