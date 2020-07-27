import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { ProfileDTOModel } from 'src/app/shared/models/profile-dto.model';
import { map, filter, mapTo, withLatestFrom } from 'rxjs/operators';
import { ClassesModel } from 'src/app/shared/models/classes-model';
import { DraggedSectionModel } from 'src/app/shared/models/dragged-section.model';
import { ExtendedProfileDTOModel } from 'src/app/shared/models/extended-profiledto.model';
// import { ExtendedProfileDTOModel } from '../../models/extended-profiledto.model';
// import { ClassesModel } from '../../models/classes-model';
// import { DraggedSectionModel } from '../../models/dragged-section.model';

@Component({
  selector: 'edu-console-section-aside',
  templateUrl: './console-section-aside.component.html',
  styleUrls: ['./console-section-aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleSectionAsideComponent implements OnInit {
  @Input() selectedClass: Observable<ClassesModel>;
  @Input() forConsoleUse: boolean;
  @Output() droppedData = new EventEmitter<DraggedSectionModel>();
  classId: string;
  filter = '';
  fileredStudents: Observable<ExtendedProfileDTOModel[]>;
  @Input() students: Observable<ExtendedProfileDTOModel[]>
  @Input() allStudents: Observable<ExtendedProfileDTOModel[]>
  @Output() onAssign = new EventEmitter<string>()
  @Output() onOpenAddModal = new EventEmitter<string>();
  @ViewChild('dropzone') dropZone: ElementRef<HTMLDivElement>;

  onTextChange(event) {
    this.filter = event.target.value;
    this.filterItems(this.filter);
  }
  onDragOver(event) {
    this.renderer.addClass(this.dropZone.nativeElement, 'group--dragged-over')
    event.preventDefault();
  }
  computeDragObj(classId: string, student: ExtendedProfileDTOModel) {
    return { classId, student };
  }
  onDrop(event) {
    event.preventDefault();
    const droppedData: DraggedSectionModel = JSON.parse(event.dataTransfer.getData('Text'));
    this.droppedData.emit(droppedData);
    this.renderer.removeClass(this.dropZone.nativeElement, 'group--dragged-over');
  }
  onDragLeave(event) {
    event.preventDefault();
    this.renderer.removeClass(this.dropZone.nativeElement, 'group--dragged-over');
  }

  openAddModal() {
    this.onOpenAddModal.emit()
  }
  areAllStudentsAssigned() {
    return this.fileredStudents.pipe(
      withLatestFrom(this.allStudents),
      map(([students, allStudents]) => {
        const isDraggedPresent = allStudents && allStudents.find(student => student.dragged);
        return allStudents && isDraggedPresent
      })
    )
  }
  ngOnInit(): void {
    this.filterItems(this.filter);
    this.selectedClass.subscribe(classItem => {
      if (!this.forConsoleUse) {
        this.classId = classItem.class.id
      } else {
        this.classId = classItem['id'];
      }

    })
  }
  setDataTransfer(event: DragEvent, student: ProfileDTOModel) {
    event.dataTransfer.setData('text', JSON.stringify(student));
  }
  stringifyJSON(obj: any) {
    return JSON.stringify(obj);
  }
  assign() {
    this.onAssign.emit(this.classId);
  }
  filterItems(_filter: string) {  // Sorting bug over here
    console.log(_filter)
    const filter = _filter.toLowerCase();
    this.fileredStudents = this.students.pipe(
      map(students => {
        return students ? students.filter(
          student => student.firstName && student.firstName.toLowerCase().match(filter) || student.lastName &&
            student.lastName.toLowerCase().match(filter)
          //|| `${student.firstName.toLowerCase()} ${student.lastName.toLowerCase()}`.match(filter)
        ) : []
      })

    )
  }
  constructor(private renderer: Renderer2) { }
}
