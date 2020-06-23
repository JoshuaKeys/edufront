import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
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
  @Output() onChangeSectionName = new EventEmitter<{ classId: string; oldName: string; newName: string }>()
  @Input() sections: Observable<SectionModel>;
  isDraggedOver = false;
  constructor(private renderer: Renderer2) { }
  addSection(classId: string) {
    this.
      onAddSection.emit(classId)
  }
  changeSectionName(inputEvt, oldName, classId) {
    this.onChangeSectionName.emit({ newName: inputEvt.target.value, oldName, classId })
  }
  onDrop(event: DragEvent, classId: string, sectionName: string) {
    event.preventDefault();
    this.isDraggedOver = false;
    const draggedStudent: ProfileDTOModel = JSON.parse(event.dataTransfer.getData('Text'))
    this.onDropped.emit({ student: draggedStudent, classId, sectionName });
  }
  onClick(classId: string, sectionName: string, student: ExtendedProfileDTOModel) {
    console.log(classId, student, sectionName)
    this.onRemove.emit({ student, classId, sectionName });
  }
  onDragOver(event: DragEvent) {
    event.preventDefault();
    console.log(event);
    this.renderer.addClass(event.target, 'drop-zone--is-dragged')
  }
  onDragLeave(event) {
    event.preventDefault();
    this.isDraggedOver = false;
    this.renderer.removeClass(event.target, 'drop-zone--is-dragged')
  }
  ngOnInit(): void {
    this.sections.subscribe(console.log)
  }
}
