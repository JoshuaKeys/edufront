import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SchoolPreviewModel } from '../../models/preview.model';

@Component({
  selector: 'edu-school-address-preview',
  templateUrl: './school-address-preview.component.html',
  styleUrls: ['./school-address-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolAddressPreviewComponent implements OnInit {
  @Input() styleMode: string;
  @Input() previewState: SchoolPreviewModel;

  ngOnInit() {
    // console.log(this.styleMode);
  }
  constructor() { }

}