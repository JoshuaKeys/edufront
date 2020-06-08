import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { ProfileDTOModel } from 'src/app/shared/models/profile-dto.model';
import { ExtendedProfileDTOModel } from '../../models/extended-profiledto.model';
import { SectionModel } from '../../models/section.model';
import { StudentModel } from 'src/app/shared/models/student.model';

@Component({
  selector: 'edu-section-drop-box',
  templateUrl: './section-drop-box.component.html',
  styleUrls: ['./section-drop-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionDropBoxComponent implements OnInit {
  @Input() selectedClass: Observable<ExtendedClassModel> | null;
  @Output() onDropped = new EventEmitter<{
    student: ExtendedProfileDTOModel;
    classId: string;
    sectionName: string;
  }>()
  @Output() onAddSection = new EventEmitter<string>()
  @Output() onRemove = new EventEmitter<{
    student: ExtendedProfileDTOModel;
    classId: string;
    sectionName: string;
  }>()
  @Input() sections: Observable<SectionModel>;
  isDraggedOver = false;
  constructor() { }
  addSection(classId: string) {
    this.onAddSection.emit(classId)
  }
  onDrop(event: DragEvent, classId: string, sectionName: string) {
    event.preventDefault();
    this.isDraggedOver = false;
    const draggedStudent: ProfileDTOModel = JSON.parse(event.dataTransfer.getData('Text'))
    console.log(draggedStudent, 'haaaaaa')
    console.log(draggedStudent, typeof draggedStudent);
    this.onDropped.emit({ student: draggedStudent, classId, sectionName });
  }
  onClick(classId: string, sectionName: string, student: ExtendedProfileDTOModel) {
    this.onRemove.emit({ student, classId, sectionName });
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDraggedOver = true;

  }
  onDragLeave(event) {
    event.preventDefault();
    this.isDraggedOver = false;
  }
  ngOnInit(): void {
    this.sections.subscribe(console.log)
  }
}
