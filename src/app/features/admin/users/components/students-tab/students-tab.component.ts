import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { users } from '../sample-user-details';
@Component({
  selector: 'edu-students-tab',
  templateUrl: './students-tab.component.html',
  styleUrls: ['./students-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsTabComponent implements OnInit {
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  searchTerm = '';
  searchState = 'inactive';

  activeSort = '';

  sortOptions = [
    { type: 'class', imgSuffix: '' },
    { type: 'alphabetical', imgSuffix: '' },
    { type: 'gender', imgSuffix: '' },
    { type: 'id', imgSuffix: '' },
    { type: 'unknown', imgSuffix: '' }
  ];
  sampleUsers = users;

  showEditStudent = false;
  showAddStudent = true;
  showSidePanel = true;
  showAddStudentPanel() {
    this.showAddStudent = !this.showAddStudent;
    this.showSidePanel = this.showAddStudent || this.showEditStudent;
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
}
