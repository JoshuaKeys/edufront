import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-phone-image-dropdown',
  templateUrl: './phone-image-dropdown.component.html',
  styleUrls: ['./phone-image-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PhoneImageDropdownComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
