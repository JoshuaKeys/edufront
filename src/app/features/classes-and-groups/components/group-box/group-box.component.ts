import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ClassModel } from '../../models/class.model';
import { GroupClassMapModel } from '../../models/group-class-map.model';

@Component({
  selector: 'edu-group-box',
  templateUrl: './group-box.component.html',
  styleUrls: ['./group-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupBoxComponent implements OnInit {
  @Output() deselected = new EventEmitter<{ class: ClassModel, groupName: string }>()
  @Input() group: GroupClassMapModel;
  @Output() onDropped = new EventEmitter<{ class: ClassModel, groupName: string }>()
  @Output() groupNameChange = new EventEmitter<{ oldName: string, newName: string }>();
  @Input() editable: boolean;
  draggedOver: boolean;
  onDrop(ev: DragEvent) {
    ev.preventDefault();
    this.draggedOver = false;
    const _class: ClassModel = JSON.parse(ev.dataTransfer.getData('Text'))
    this.onDropped.emit({ class: _class, groupName: this.group.groupName });
  }
  onDragOver(ev: DragEvent) {
    ev.preventDefault();
    this.draggedOver = true;
  }
  ngOnInit(): void {
  }
  onDeselected(classItem: ClassModel) {
    this.deselected.emit({ class: classItem, groupName: this.group.groupName })
  }
  onDragLeave(ev: DragEvent) {
    ev.preventDefault();
    this.draggedOver = false;
  }
  onGroupNameChange(event: FocusEvent) {
    this.groupNameChange.emit({ oldName: this.group.groupName, newName: event.target['value'] })
  }
  constructor() { }
}
