import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PreviewModel } from '../../models/preview.model';

@Component({
  selector: 'edu-school-terms-preview',
  templateUrl: './school-terms-preview.component.html',
  styleUrls: ['./school-terms-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolTermsPreviewComponent implements OnInit {
  @Input() previewState: Observable<PreviewModel>;
  constructor() { }

  ngOnInit(): void {
  }

}
