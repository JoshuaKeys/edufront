import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
