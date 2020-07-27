import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { ProfileDTOModel } from 'src/app/shared/models/profile-dto.model';
import { map, filter, mapTo, withLatestFrom } from 'rxjs/operators';
import { ExtendedProfileDTOModel } from '../../models/extended-profiledto.model';
import { ClassesModel } from '../../models/classes-model';

@Component({
  selector: 'edu-section-aside',
  templateUrl: './section-aside.component.html',
  styleUrls: ['./section-aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionAsideComponent implements OnInit {
  @Input() selectedClass: Observable<ClassesModel>;
  @Input() forConsoleUse: boolean;
  classId: string;
  filter = '';
  fileredStudents: Observable<ExtendedProfileDTOModel[]>;
  @Input() students: Observable<ExtendedProfileDTOModel[]>
  @Input() allStudents: Observable<ExtendedProfileDTOModel[]>
  @Output() onAssign = new EventEmitter<string>()
  @Output() onOpenAddModal = new EventEmitter<string>();
  constructor() { }
  onTextChange(event) {
    this.filter = event.target.value;
    this.filterItems(this.filter);
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
}
