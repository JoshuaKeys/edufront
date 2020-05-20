import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-icon-popup',
  templateUrl: './icon-popup.component.html',
  styleUrls: ['./icon-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconPopupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
