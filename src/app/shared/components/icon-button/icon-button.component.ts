import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { SubjectModel } from '../../models/_subject.model';
import { SelectableSubjectModel } from '../../models/selectable-subject.model';

@Component({
  selector: 'edu-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconButtonComponent implements OnInit {
  @Input() subject: SelectableSubjectModel;
  @Input() mode: string;
  @Output() onClick = new EventEmitter<SelectableSubjectModel>();

  constructor() { }
  onDragOver(event) {
    event.preventDefault();
  }
  onDrop(event) {
    event.preventDefault();
  }
  handleClick() {
    if (this.mode !== 'select') {
      return;
    }
    this.onClick.emit(this.subject)
  }
  ngOnInit(): void {
  }

}
