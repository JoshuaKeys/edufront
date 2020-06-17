import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'edu-user-pill-sorted-views',
  templateUrl: './user-pill-sorted-views.component.html',
  styleUrls: ['./user-pill-sorted-views.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPillSortedViewsComponent implements OnInit {
  constructor() {}
  @Input() set users(_users) {
    this._users = _users;
    console.log('init users');
    if (this._activeSort != null) {
      this.parsedUsers = this.parseUser(this._users, this._activeSort);
    }
  }
  @Input() set activeSort(sortOption) {
    // console.log('init sort' + sortOption);
    this._activeSort = sortOption;
    if (this._users != null) {
      this.parsedUsers = this.parseUser(this._users, sortOption);
    }
  }
  _activeSort = null;
  parsedUsers = null;
  _users = null;
  classes = {};
  gender = {
    male: [],
    female: []
  };
  ngOnInit(): void {
    // console.log(this._users);
    // console.log(this._activeSort);
  }

  sortingFn(a, b) {
    // if (a.name.length != b.name.length) {
    //   return a.name.length > b.name.length ? 1 : -1;
    // } else {
    return a.name > b.name ? 1 : -1;
    // }
  }

  parseUser(users, sort) {
    switch (sort) {
      case '':
        return users.map(user => {
          let newName = { name: `C${user.class} ${user.name}` };
          return { ...user, ...newName };
        });
        break;
      case 'alphabetical':
        let tempalpha = [...users];
        return tempalpha.sort((a, b) => {
          if (a.name.substring(0, 1) == b.name.substring(0, 1)) {
            return a.name.substring(0, 3) > b.name.substring(0, 3) ? 1 : -1;
          } else {
            return a.name.substring(0, 1) > b.name.substring(0, 1) ? 1 : -1;
          }
        });
        break;
      case 'id':
        let tempid = [...users];
        return tempid.sort((a, b) => {
          return a.id > b.id ? 1 : -1;
        });
        break;

      case 'class':
        users.map(user => {
          let identifiedClasses = Object.keys(this.classes);
          // console.log(identifiedClasses.indexOf(user.class));
          if (identifiedClasses.indexOf(`Class ${user.class}`) === -1) {
            this.classes[`Class ${user.class}`] = [user];
          } else {
            this.classes[`Class ${user.class}`].push(user);
          }
        });
        return users;
        break;

      case 'gender':
        this.gender = {
          male: [],
          female: []
        };
        users.map(user => {
          if (user.gender === 'male') {
            this.gender.male.push(user);
          } else {
            this.gender.female.push(user);
          }
        });
        return users;
        break;
    }

    return users;
  }
}
