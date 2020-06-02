import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentsXClassesModel } from '../../models/students-x-classes.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'edu-sort-by-gender',
  templateUrl: './sort-by-gender.component.html',
  styleUrls: ['./sort-by-gender.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortByGenderComponent implements OnInit {
  @Input() students: Observable<StudentsXClassesModel[]>;
  studentsObj: Observable<StudentsXClassesModel[]>;
  males: Observable<StudentsXClassesModel[]>;
  females: Observable<StudentsXClassesModel[]>;


  ngOnChanges(changes: SimpleChanges) {
    this.studentsObj = changes.students.currentValue
    this.males = changes.students.currentValue.pipe(
      map((students: StudentsXClassesModel[]) => students.filter(student => student.gender.toLowerCase() === 'male'))
    )
    this.females = changes.students.currentValue.pipe(
      map((students: StudentsXClassesModel[]) => students.filter(student => student.gender.toLowerCase() === 'female'))
    )
  }

  ngOnInit(): void {
    this.studentsObj = this.students;
    this.males = this.students.pipe(
      map(students => students.filter(student => student.gender.toLowerCase() === 'male'))
    )
    this.females = this.students.pipe(
      map(students => students.filter(student => student.gender.toLowerCase() === 'female'))
    )
  }
  constructor() { }
}
