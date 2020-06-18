import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { users } from '../sample-user-details';
import { StudentsService } from '../../services/students.service';
@Component({
  selector: 'edu-students-tab',
  templateUrl: './students-tab.component.html',
  styleUrls: ['./students-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsTabComponent implements OnInit {
  constructor(
    private cd: ChangeDetectorRef,
    private studentService: StudentsService
  ) {}

  ngOnInit(): void {
    this.boundStudentClick = this.studentClick.bind(this);
    this.boundResetStudents = this.resetStudents.bind(this);
    console.log('registering');
    this.registerActiveStudentSub();
  }

  searchTerm = '';
  searchState = 'inactive';
  activeStudents = [];
  activeSort = '';

  sortOptions = [
    { type: 'class', imgSuffix: '' },
    { type: 'alphabetical', imgSuffix: '' },
    { type: 'gender', imgSuffix: '' },
    { type: 'id', imgSuffix: '' },
    { type: 'unknown', imgSuffix: '' }
  ];
  users = users;

  showEditStudent = false;
  showAddStudent = false;
  // showSidePanel = true;
  public boundStudentClick: Function;
  public boundResetStudents: Function;
  showAddStudentPanel() {
    this.showAddStudent = !this.showAddStudent;
    // this.showSidePanel =
  }

  showSidePanel() {
    return this.showAddStudent || this.showEditStudent;
  }
  setSortBtnImg(index, imgSuffix) {
    if (imgSuffix != '') {
      this.sortOptions[index].imgSuffix = `-${imgSuffix}`;
    } else {
      this.sortOptions[index].imgSuffix = imgSuffix;
    }
    this.cd.markForCheck();
  }

  setSearchState(state) {
    this.searchState = state;
    this.cd.markForCheck();
  }
  hideLabel() {
    // console.log(this.searchTerm.length);
    // console.log(this.searchTerm.length === 0);
    return this.searchTerm.length > 0 || this.searchState === 'active';
  }
  sortClick(sort) {
    if (this.activeSort === sort) {
      this.activeSort = '';
    } else {
      this.activeSort = sort;
    }
  }
  isActiveSort(sort) {
    return this.activeSort === sort;
  }

  registerActiveStudentSub() {
    this.studentService.activeStudents$.subscribe(_activeStudents => {
      this.activeStudents = [..._activeStudents];
      this.showEditStudent = this.activeStudents.length === 1;
    });
  }

  resetStudents() {
    this.studentService.resetActiveStudents();
  }

  studentClick(user) {
    this.studentService.studentPillClick(this.activeStudents, user);
  }
}
