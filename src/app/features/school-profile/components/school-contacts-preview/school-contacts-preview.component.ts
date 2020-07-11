import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SchoolPreviewModel } from '../../models/preview.model';

@Component({
  selector: 'edu-school-contacts-preview',
  templateUrl: './school-contacts-preview.component.html',
  styleUrls: ['./school-contacts-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolContactsPreviewComponent implements OnInit {
  @Input() previewState: SchoolPreviewModel;
  constructor() { }

  ngOnInit(): void {
  }

}
