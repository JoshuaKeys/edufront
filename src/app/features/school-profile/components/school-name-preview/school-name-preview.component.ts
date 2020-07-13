import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SchoolPreviewModel } from '../../models/preview.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'edu-school-name-preview',
  templateUrl: './school-name-preview.component.html',
  styleUrls: ['./school-name-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolNamePreviewComponent implements OnInit {
  @Input() styleMode: string;
  @Input() previewState: SchoolPreviewModel;
  @Input() noBorder: boolean;
  ngOnInit() {
    // console.log(this.styleMode);
  }
  computeBorder() {
    if (this.noBorder) {
      return {
        border: 'none'
      }
    }
  }
  constructor() { }
}
