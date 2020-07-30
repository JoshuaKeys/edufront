import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';

@Component({
  selector: 'edu-delete-classes-modal',
  templateUrl: './delete-classes-modal.component.html',
  styleUrls: ['./delete-classes-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteClassesModalComponent implements OnInit {
  @Input() deletedClasses: ExtendedClassModel[];
  @Output() onCancel = new EventEmitter()
  @Output() onDelete = new EventEmitter();
  cancel() {
    this.onCancel.emit();
  }
  delete() {
    this.onDelete.emit();
  }
  getText() {
    let result = '';
    for (let i = 0; i < this.deletedClasses.length; i++) {
      if (i === this.deletedClasses.length - 2) {
        result += this.deletedClasses[i].name + ' and ' + this.deletedClasses[i + 1].name
        break;
      } else {
        result += this.deletedClasses[i].name + ','
      }
    }
    return result;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
