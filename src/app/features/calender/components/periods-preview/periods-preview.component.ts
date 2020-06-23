import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PreviewModel } from '../../models/preview.model';

@Component({
  selector: 'edu-periods-preview',
  templateUrl: './periods-preview.component.html',
  styleUrls: ['./periods-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeriodsPreviewComponent implements OnInit {
  @Input() previewState: Observable<PreviewModel>;
  constructor() { }

  ngOnInit(): void {
  }

}
