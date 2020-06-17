import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-users-shell',
  templateUrl: './users-shell.component.html',
  styleUrls: ['./users-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
