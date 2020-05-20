import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { SubjectModel } from '../../models/subject.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'edu-subjects-box',
  templateUrl: './subjects-box.component.html',
  styleUrls: ['./subjects-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectsBoxComponent implements OnInit {
  @Output() onDropped = new EventEmitter<SubjectModel>();
  @Input() subjects: Observable<SubjectModel[]>;
  constructor() { }
  onDragOver(event) {
    event.preventDefault();

  }
  onDrop(event) {
    event.preventDefault();
    const draggedSubject = JSON.parse(event.dataTransfer.getData('Text')) as SubjectModel;
    this.onDropped.emit(draggedSubject);
  }
  ngOnInit(): void {
  }

}
