import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-contact-details-page',
  templateUrl: './contact-details-page.component.html',
  styleUrls: ['./contact-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
