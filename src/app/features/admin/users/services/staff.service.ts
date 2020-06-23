import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StaffService {
  constructor() {}
  activeStaff$ = new BehaviorSubject([]);

  resetActiveStudents() {
    this.activeStaff$.next([]);
  }

  setActiveStaff(staff) {
    this.activeStaff$.next(staff);
  }

  staffPillClick(activeStaff, staff) {
    let results = activeStaff.filter(_student => {
      return _student.id !== staff.id;
    });

    if (results.length === activeStaff.length) {
      results.push(staff);
    }
    this.setActiveStaff(results);
  }
}
