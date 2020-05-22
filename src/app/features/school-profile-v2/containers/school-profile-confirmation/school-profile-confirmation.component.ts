import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-school-profile-confirmation',
  templateUrl: './school-profile-confirmation.component.html',
  styleUrls: ['./school-profile-confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolProfileConfirmationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
