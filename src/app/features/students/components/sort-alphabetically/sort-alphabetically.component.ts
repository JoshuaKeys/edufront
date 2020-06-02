import { Component, OnInit, ChangeDetectionStrategy, Input, SimpleChanges } from '@angular/core';
import { StudentsXClassesModel } from '../../models/students-x-classes.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'edu-sort-alphabetically',
  templateUrl: './sort-alphabetically.component.html',
  styleUrls: ['./sort-alphabetically.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortAlphabeticallyComponent implements OnInit {
  @Input() studentsXClasses: Observable<StudentsXClassesModel[]>;
  alphabetObj: Observable<any>
  constructor() { }

  ngOnInit(): void {
    this.alphabetObj = this.studentsXClasses.pipe(
      map(staff => {
        return this.sortByAlphabet(staff);
      })
    )
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.studentsXClasses.firstChange) {
      return;
    }
    this.alphabetObj = changes.studentsXClasses.currentValue.pipe(
      map((studentsXClasses: StudentsXClassesModel[]) => {
        return this.sortByAlphabet(studentsXClasses);
      })
    )
  }
  createAlphabetObj(students: StudentsXClassesModel[]) {
    let alphabetSet = new Set();
    students.forEach(student => alphabetSet.add(student.firstName.slice(0, 1).toLowerCase()));
    return Array.from(alphabetSet).map(item => ({
      alphabet: item,
      items: []
    }))
  }
  sortByAlphabet(students: StudentsXClassesModel[]) {
    let alphabetObj = this.createAlphabetObj(students);

    students.forEach(item => {
      let firstAlphbet = item.firstName.slice(0, 1);
      let idx = alphabetObj.findIndex(item => item.alphabet === firstAlphbet.toLowerCase());
      alphabetObj[idx].items.push(item)
    })
    return alphabetObj;
  }
}
