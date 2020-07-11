import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SchoolPreviewModel } from '../../models/preview.model';

@Component({
  selector: 'edu-parent-preview',
  templateUrl: './parent-preview.component.html',
  styleUrls: ['./parent-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentPreviewComponent implements OnInit {
  @Input() previewState: SchoolPreviewModel;
  constructor() { }
  addressSet(previewState: SchoolPreviewModel) {
    return Object.keys(previewState.schoolAddress).length > 1;
  }
  schoolNameSet(previewState: SchoolPreviewModel) {
    return Object.keys(previewState.schoolName).length > 1
  }
  contactsSet(previewState: SchoolPreviewModel) {
    return Object.keys(previewState.schoolContact).length > 1;
  }
  logoSet(previewState: SchoolPreviewModel) {
    return Object.keys(previewState.schoolLogo).length > 1;
  }
  ngOnInit(): void {
    console.log(this.previewState)
  }

}
