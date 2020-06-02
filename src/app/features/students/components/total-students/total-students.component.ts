import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentsXClassesModel } from '../../models/students-x-classes.model';
import { Store } from '@ngrx/store';
import { StudentsStateModel } from '../../models/students-state.model';
import { selectStudentsAndClasses } from '../../ngrx/selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'edu-total-students',
  templateUrl: './total-students.component.html',
  styleUrls: ['./total-students.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TotalStudentsComponent implements OnInit, OnChanges {
  @Input() studentsXClasses: Observable<StudentsXClassesModel[]>;
  classesObject: Observable<any>;

  ngOnInit(): void {
    this.studentsXClasses = this.store.select(selectStudentsAndClasses)
    this.classesObject = this.studentsXClasses.pipe(
      map(staff => {
        return this.sortByClasses(staff);
      })
    )
    this.classesObject.subscribe(console.log);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.studentsXClasses.firstChange) {
      return;
    }
    this.classesObject = changes.studentsXClasses.currentValue.pipe(
      map((studentsXClasses: StudentsXClassesModel[]) => {
        return this.sortByClasses(studentsXClasses);
      })
    )
  }
  createClassObj(students: StudentsXClassesModel[]) {
    let classObj = new Set();
    students.forEach(student => classObj.add(student.className));
    return Array.from(classObj).map(item => ({
      class: item,
      items: []
    }))
  }
  sortByClasses(students: StudentsXClassesModel[]) {
    let classObj = this.createClassObj(students);

    students.forEach(item => {
      let classItem = item.className;
      let idx = classObj.findIndex(item => item.class === classItem);
      classObj[idx].items.push(item);
    })
    return classObj.sort((a, b) => +a.class - +b.class);
  }
  constructor(private store: Store<StudentsStateModel>) { }
}
