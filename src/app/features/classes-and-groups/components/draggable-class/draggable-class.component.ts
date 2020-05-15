import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ClassModel } from '../../models/class.model';

@Component({
  selector: 'edu-draggable-class',
  templateUrl: './draggable-class.component.html',
  styleUrls: ['./draggable-class.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraggableClassComponent implements OnInit {
  @Input() class: ClassModel;
  constructor() { }

  ngOnInit(): void {
  }
  onDrag(ev: DragEvent) {
    ev.dataTransfer.setData('text/plain', JSON.stringify(this.class))
  }
}
