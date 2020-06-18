import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef
} from '@angular/core';

@Component({
  selector: 'edu-user-summary-preview',
  templateUrl: './user-summary-preview.component.html',
  styleUrls: ['./user-summary-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSummaryPreviewComponent implements OnInit {
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    // console.log(this._displayFooter);
  }

  @Input() set users(_users) {
    this._users = _users;
    this.parser(_users);
    console.log(this.classes);
  }
  @Input() userType = 'student';
  @Input('displayFooter') displayFooter = true;
  _users;
  classes = {};
  parser(users) {
    users.map(user => {
      let identifiedClasses = Object.keys(this.classes);
      // console.log(identifiedClasses.indexOf(user.class));
      if (identifiedClasses.indexOf(`${user.class}`) === -1) {
        this.classes[`${user.class}`] = [user];
      } else {
        this.classes[`${user.class}`].push(user);
      }
    });
  }
}
