import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  constructor() {}
  activeStudents$ = new BehaviorSubject([]);

  resetActiveStudents() {
    this.activeStudents$.next([]);
  }

  setActiceStudents(students) {
    this.activeStudents$.next(students);
  }

  studentPillClick(activeStudents, student) {
    let results = activeStudents.filter(_student => {
      return _student.id !== student.id;
    });

    if (results.length === activeStudents.length) {
      results.push(student);
    }
    this.setActiceStudents(results);
  }
}
