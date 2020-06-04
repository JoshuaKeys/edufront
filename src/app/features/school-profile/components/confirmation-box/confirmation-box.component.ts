import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { PreviewModel } from '../../models/preview.model';

@Component({
  selector: 'edu-confirmation-box',
  templateUrl: './confirmation-box.component.html',
  styleUrls: ['./confirmation-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationBoxComponent implements OnInit {
  @Input() items: PreviewModel[];
  constructor() { }

  ngOnInit(): void {
    console.log(this.items);
  }

}
