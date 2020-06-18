import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'edu-user-excel-preview',
  templateUrl: './user-excel-preview.component.html',
  styleUrls: ['./user-excel-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserExcelPreviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
