import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Observable } from 'rxjs';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { ClassesModel } from '../../models/classes-model';
import { ProfileDTOModel } from 'src/app/shared/models/profile-dto.model';
import { map, filter, mapTo, withLatestFrom } from 'rxjs/operators';
import { ExtendedProfileDTOModel } from '../../models/extended-profiledto.model';
import { Store } from '@ngrx/store';
import { SectionsStateModel } from '../../models/sections-state.model';
import { autoAssignStudentsToSections } from '../../ngrx/actions/sections.actions';
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
  fileredStudents: Observable<ExtendedProfileDTOModel[]>;
  @Input() students: Observable<ExtendedProfileDTOModel[]>;
  @Input() allStudents: Observable<ExtendedProfileDTOModel[]>;
  @Output() onAssign = new EventEmitter<string>();
  @Output() onOpenAddModal = new EventEmitter<string>();
  constructor(private store: Store<SectionsStateModel>) {}
  onTextChange(event) {
    this.filter = event.target.value;
    this.filterItems(this.filter);
  }
  openAddModal() {
    this.onOpenAddModal.emit();
  }
  areAllStudentsAssigned() {
    return this.fileredStudents.pipe(
      withLatestFrom(this.allStudents),
      map(([students, allStudents]) => {
        const isDraggedPresent =
          allStudents && allStudents.find(student => student.dragged);
        return allStudents && isDraggedPresent;
      })
    );
  }
  ngOnInit(): void {
    this.filterItems(this.filter);
    this.selectedClass.subscribe(
      classItem => (this.classId = classItem.class.id)
    );
  }
  setDataTransfer(event: DragEvent, student: ProfileDTOModel) {
    event.dataTransfer.setData('text', JSON.stringify(student));
  }
  stringifyJSON(obj: any) {
    return JSON.stringify(obj);
  }
  assign() {
    this.store.dispatch(autoAssignStudentsToSections());

    // this.onAssign.emit(this.classId);
  }
  filterItems(_filter: string) {
    // Sorting bug over here
    console.log(_filter);
    const filter = _filter.toLowerCase();
    this.fileredStudents = this.students.pipe(
      map(students => {
        return students
          ? students.filter(
              student =>
                (student.firstName &&
                  student.firstName.toLowerCase().match(filter)) ||
                (student.lastName &&
                  student.lastName.toLowerCase().match(filter))
              //|| `${student.firstName.toLowerCase()} ${student.lastName.toLowerCase()}`.match(filter)
            )
          : [];
      })
    );
  }
}
