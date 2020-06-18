import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { users } from '../sample-user-details';
import { StaffService } from '../../services/staff.service';
@Component({
  selector: 'edu-teachers-tab',
  templateUrl: './teachers-tab.component.html',
  styleUrls: ['./teachers-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeachersTabComponent implements OnInit {
  constructor(
    private cd: ChangeDetectorRef,
    private staffService: StaffService
  ) {}

  ngOnInit(): void {
    this.boundStaffClick = this.staffClick.bind(this);
    this.boundResetStaffs = this.resetStaffs.bind(this);
    console.log('registering');
    this.registerActiveStudentSub();
  }

  set searchTerm(val) {
    this.filteredUsers = this.users.filter(user => {
      let name = `${user.firstName.toLowerCase()}${user.lastName.toLowerCase()}`;
      return name.replace(' ', '').includes(val.toLowerCase().replace(' ', ''));
    });

    this._searchTerm = val;
  }
  get searchTerm() {
    return this._searchTerm;
  }
  _searchTerm = '';

  searchState = 'inactive';
  activeStaff = [];
  activeSort = '';

  sortOptions = [
    // { type: 'class', imgSuffix: '' },
    { type: 'alphabetical', imgSuffix: '' },
    { type: 'gender', imgSuffix: '' },
    // { type: 'id', imgSuffix: '' },
    { type: 'unknown', imgSuffix: '' }
  ];
  users = users;
  filteredUsers = this.users;

  showEditStaff = false;
  showAddStaff = false;
  public boundStaffClick: Function;
  public boundResetStaffs: Function;

  showAddStaffPanel() {
    this.showAddStaff = !this.showAddStaff;
  }

  showSidePanel() {
    return this.showAddStaff || this.showEditStaff;
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
    this.staffService.activeStaff$.subscribe(_activeStaff => {
      this.activeStaff = [..._activeStaff];
      this.showEditStaff = this.activeStaff.length === 1;
    });
  }

  resetStaffs() {
    this.staffService.resetActiveStudents();
  }

  staffClick(user) {
    this.staffService.staffPillClick(this.activeStaff, user);
  }
}
