import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

interface User {
  name: string;
  img: string;
  gender: string;
}

@Component({
  selector: 'edu-user-pill',
  templateUrl: './user-pill.component.html',
  styleUrls: ['./user-pill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPillComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // console.log(typeof this.user.img == 'undefined');
    if (typeof this.user.img === 'undefined') {
      this.user.img = '';
    }
    if (typeof this.user.prefix === 'undefined') {
      this.user.prefix = '';
    }
    this.placeholderName = ` ${this.user.firstName.substring(
      0,
      1
    )} ${this.user.lastName.substring(1, 2)}`;

    // console.log(
    //   this.placeholderName + ',' + this.user.lastName.substring(1, 2)
    // );
    // console.log(this.user);
    this._user = this.user;
    this._user.name = `${this.user.prefix} ${this.user.firstName} ${this.user.lastName}`;
  }

  placeholderName = '';
  @Input() user: any;
  _user: User;
}
