import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SchoolPreviewModel } from '../../models/preview.model';

@Component({
  selector: 'edu-school-logo-preview',
  templateUrl: './school-logo-preview.component.html',
  styleUrls: ['./school-logo-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolLogoPreviewComponent implements OnInit {
  @Input() previewState: SchoolPreviewModel;
  @Input() noBorder: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  computeBorder() {
    if (this.noBorder) {
      return {
        border: 'none'
      }
    }
  }
}
