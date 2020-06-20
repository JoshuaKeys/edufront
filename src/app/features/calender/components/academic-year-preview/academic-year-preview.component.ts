import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PreviewModel } from '../../models/preview.model';

@Component({
  selector: 'edu-academic-year-preview',
  templateUrl: './academic-year-preview.component.html',
  styleUrls: ['./academic-year-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AcademicYearPreviewComponent implements OnInit {
  @Input() startYear: string;
  @Input() endYear: string;
  @Input() previewState: Observable<PreviewModel>;
  constructor() { }

  ngOnInit(): void {
    console.log(this.startYear)
  }

}
