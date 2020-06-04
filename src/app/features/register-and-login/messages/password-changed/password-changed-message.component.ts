import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
 
@Component({
  selector: 'edu-password-changed-message',
  templateUrl: './password-changed-message.component.html',
  styleUrls: ['./password-changed-message.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordChangedMessageComponent implements OnInit {

  constructor( ) { }

  ngOnInit(): void {
 
  }

  

}
