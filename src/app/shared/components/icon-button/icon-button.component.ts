import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { SubjectModel } from '../../models/_subject.model';

@Component({
  selector: 'edu-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconButtonComponent implements OnInit {
  @Input() subject: SubjectModel;
  constructor() { }
  onDragOver(event) {
    event.preventDefault();
  }
  onDrop(event) {
    event.preventDefault();
    console.log(event.dataTransfer);
  }
  ngOnInit(): void {
  }

}
