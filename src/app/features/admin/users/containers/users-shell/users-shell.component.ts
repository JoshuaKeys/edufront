import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'edu-users-shell',
  templateUrl: './users-shell.component.html',
  styleUrls: ['./users-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersShellComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  isActiveRoute(param) {
    // console.log(this.router.url);
    // console.log(`/admin/users/${param}`);
    // console.log(this.router.url === `/admin/users/${param}`);

    return this.router.url === `/admin/users/${param}`;
  }
}
