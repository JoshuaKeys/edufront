import { Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { PreviewModel } from 'src/app/features/school-profile-v2/models/preview.model';

@Component({
  selector: 'edu-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @Input() styleMode: string;
  @Input() previewState: Observable<PreviewModel>;

  ngOnInit() {
    console.log(this.styleMode);
  }
  constructor() {
  }
}