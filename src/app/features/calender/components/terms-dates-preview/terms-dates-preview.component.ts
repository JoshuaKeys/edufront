import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { PreviewModel } from '../../models/preview.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'edu-terms-dates-preview',
  templateUrl: './terms-dates-preview.component.html',
  styleUrls: ['./terms-dates-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TermsDatesPreviewComponent implements OnInit {
  @Input() previewState: Observable<PreviewModel>;
  constructor() { }

  ngOnInit(): void {
  }
  getDateFormat(dateStr: string) {
    if(dateStr.length > 0) {
      const dateObj= new Date(dateStr);
      const day = dateObj.getDate();
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr',
        'May', 'Jun', 'Jul','Aug',
        'Sep', 'Oct', 'Nov', 'Dec'
      ]
      const month = months.find((mon, idx) => idx ===dateObj.getMonth());
      const fullYear = dateObj.getFullYear();

      return `${day} ${month} ${fullYear}`
    }
    return ''
  }
}
