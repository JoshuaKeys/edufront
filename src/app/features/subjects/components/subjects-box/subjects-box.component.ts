import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { SubjectModel } from '../../models/subject.model';
import { Observable } from 'rxjs';
import { ClassModel } from 'src/app/shared/models/class.model';

@Component({
  selector: 'edu-subjects-box',
  templateUrl: './subjects-box.component.html',
  styleUrls: ['./subjects-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectsBoxComponent implements OnInit {
  @Output() onDropped = new EventEmitter<SubjectModel>();
  @Input() subjects: Observable<SubjectModel[]>;
  @Output() subjectRemoval = new EventEmitter<SubjectModel>();
  @Input() selectedClasses: Observable<ClassModel[]>
  constructor() { }
  onDragOver(event) {
    event.preventDefault();

  }
  onDrop(event) {
    event.preventDefault();
    const draggedSubject = JSON.parse(event.dataTransfer.getData('Text')) as SubjectModel;
    this.onDropped.emit(draggedSubject);
  }
  removeFromSelected(subject: SubjectModel) {
    this.subjectRemoval.emit(subject)
  }
  ngOnInit(): void {
    this.selectedClasses.subscribe(console.log)
  }

}
