import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ClassModel } from '../../models/class.model';


@Component({
  selector: 'edu-draggable-class',
  templateUrl: './draggable-class.component.html',
  styleUrls: ['./draggable-class.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableClassComponent implements OnInit {
  @Input() class: ClassModel;
  @Input() draggable: boolean;
  @Output() deselected = new EventEmitter<ClassModel>();
  constructor() { }

  ngOnInit(): void {
  }
  processClicks() {
    if (!this.draggable) {
      this.deselected.emit(this.class)
    }
  }
}
