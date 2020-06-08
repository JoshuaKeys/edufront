import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { ClassesModel } from '../../models/classes-model';
import { ProfileDTOModel } from 'src/app/shared/models/profile-dto.model';
import { map } from 'rxjs/operators';
import { ExtendedProfileDTOModel } from '../../models/extended-profiledto.model';

@Component({
  selector: 'edu-section-aside',
  templateUrl: './section-aside.component.html',
  styleUrls: ['./section-aside.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionAsideComponent implements OnInit {
  @Input() selectedClass: Observable<ClassesModel>;
  classId: string;
  filter = '';
  fileredStudents: Observable<ProfileDTOModel[]>;
  @Input() students: Observable<ExtendedProfileDTOModel[]>
  @Output() onAssign = new EventEmitter<string>()
  constructor() { }
  onTextChange(event) {
    this.filter = event.target.value;
    this.filterItems(this.filter);
  }
  ngOnInit(): void {
    this.filterItems(this.filter);
    this.selectedClass.subscribe(classItem => this.classId = classItem.class.id)
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
    const filter = _filter.toLowerCase();
    this.fileredStudents = this.students.pipe(
      map(students => students ? students.filter(
        student => student.firstName.toLowerCase().match(filter) || student.lastName.toLowerCase().match(filter)
          || `${student.firstName.toLowerCase()} ${student.lastName.toLowerCase()}`.match(filter)
      ) : [])

    )
  }
}
