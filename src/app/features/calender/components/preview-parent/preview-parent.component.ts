import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { PreviewModel } from '../../models/preview.model';

@Component({
  selector: 'edu-preview-parent',
  templateUrl: './preview-parent.component.html',
  styleUrls: ['./preview-parent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewParentComponent implements OnInit {
  @Input() previewState: Observable<PreviewModel>;
  previewArray: Array<{name: string, item: any}> = [];
  constructor() { }

  ngOnInit(): void {
    this.previewState.subscribe(previewState=> {
      for(let preview in previewState) {
        this.previewArray.push({name: preview, item: previewState[preview]})
      }
    })
  }

}
