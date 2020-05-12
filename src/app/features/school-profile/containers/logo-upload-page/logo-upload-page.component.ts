import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-logo-upload-page',
  templateUrl: './logo-upload-page.component.html',
  styleUrls: ['./logo-upload-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoUploadPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
