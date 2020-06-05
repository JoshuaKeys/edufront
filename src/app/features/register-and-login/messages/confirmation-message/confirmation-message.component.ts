import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationMessageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
