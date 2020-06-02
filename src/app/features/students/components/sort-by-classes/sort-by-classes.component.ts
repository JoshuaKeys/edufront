import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentsXClassesModel } from '../../models/students-x-classes.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'edu-sort-by-classes',
  templateUrl: './sort-by-classes.component.html',
  styleUrls: ['./sort-by-classes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortByClassesComponent implements OnInit {
  @Input() studentsXClasses: Observable<StudentsXClassesModel[]>;
  classesObject: Observable<any>
  constructor() { }

  ngOnInit(): void {
    this.classesObject = this.studentsXClasses.pipe(
      map(staff => {
        return this.sortByClasses(staff);
      })
    )
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
}
