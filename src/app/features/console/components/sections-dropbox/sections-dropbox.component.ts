import { Component, OnInit, ChangeDetectionStrategy, Renderer2, EventEmitter, Output, Input } from '@angular/core';
import { ProfileDTOModel } from 'src/app/shared/models/profile-dto.model';
import { ExtendedProfileDTOModel } from 'src/app/shared/models/extended-profiledto.model';
import { SectionModel } from 'src/app/shared/models/section.model';
import { Observable } from 'rxjs';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { AggregatedResult } from '../../models/aggregated-result.model';

@Component({
  selector: 'edu-sections-dropbox',
  templateUrl: './sections-dropbox.component.html',
  styleUrls: ['./sections-dropbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionsDropboxComponent implements OnInit {
  @Input() selectedClass: Observable<ExtendedClassModel> | null;
  @Output() onDropped = new EventEmitter<{
    student: ExtendedProfileDTOModel;
    classId: string;
    sectionName: string;
  }>()
  @Input() aggregatedResult: Observable<AggregatedResult>

  @Output() onAddSection = new EventEmitter<string>()
  @Output() onRemove = new EventEmitter<{
    student: ExtendedProfileDTOModel;
    classId: string;
    sectionName: string;
  }>()
  @Output() onChangeSectionName = new EventEmitter<{ classId: string; oldName: string; newName: string }>()
  @Input() sections: Observable<SectionModel>;
  isDraggedOver = false;
  constructor(private renderer: Renderer2) {

  }
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
    this.renderer.addClass(event.target, 'drop-zone--is-dragged');
  }
  onDragLeave(event) {
    event.preventDefault();
    this.isDraggedOver = false;
    this.renderer.removeClass(event.target, 'drop-zone--is-dragged');
  }
  ngOnInit(): void {
  }
}
