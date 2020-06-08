import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentsModalModel } from '../../models/students-modal.model';
import { Store } from '@ngrx/store';
import { StudentsStateModel } from '../../models/students-state.model';
import { selectModalState, selectSortingState, selectStudentsAndClasses } from '../../ngrx/selectors'
import { toggleStartModal, toggleAddModal } from '../../ngrx/actions/students-modal.actions';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { toggleEndModal } from 'src/app/features/subjects/ngrx/actions';
import { StudentsSortingModel } from '../../models/students-sorting.model';
import { toggleSortByAlphabet, toggleSortByGender, toggleSortyByClasses } from '../../ngrx/actions/students-sorting.actions';
import { StudentsXClassesModel } from '../../models/students-x-classes.model';
import { map } from 'rxjs/operators';
import { StudentModel } from '../../../../shared/models/student.model';
import { createStudentRequest, deleteStudentRequest } from '../../ngrx/actions/class-students.actions';
import { StudentsCommunicatorService } from '../../services/students-communicator.service';
@Component({
  selector: 'edu-students-creation',
  templateUrl: './students-creation.component.html',
  styleUrls: ['./students-creation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StudentsCommunicatorService]
})
export class StudentsCreationComponent implements OnInit {
  studentsModalState: Observable<StudentsModalModel>
  activatedRouteData = this.activatedRoute.snapshot.data;
  sortingState: Observable<StudentsSortingModel>;
  studentsXClasses: Observable<StudentsXClassesModel[]>;

  ngOnInit(): void {
    this.studentsModalState = this.store.select(selectModalState);
    this.sortingState = this.store.select(selectSortingState)
    this.studentsXClasses = this.store.select(selectStudentsAndClasses);
    this.studentCommunication.studentEdition$.subscribe(student => this.onEditStudent(student))
    this.studentCommunication.studentRemoval$.subscribe(student => this.onRemoveStudent(student))
  }
  onStart() {
    this.store.dispatch(toggleStartModal())
  }
  onTextChange(event) {
    const searchField = event.target.value;
    this.studentsXClasses = this.store.select(selectStudentsAndClasses).pipe(
      map(staffs => staffs.filter(staff => this.matchByAllNameTypes(staff, searchField)))
    );
  }
  createStudent(student: StudentModel) {
    this.store.dispatch(createStudentRequest({ student }))
  }
  matchByAllNameTypes(students: StudentsXClassesModel, searchField) {
    const firstNameMatch = students.firstName ? students.firstName.toLowerCase().match(searchField.toLowerCase()) : null;
    const middleNameMatch = students.middleName ? students.middleName.toLowerCase().match(searchField.toLowerCase()) : null;
    const lastNameMatch = students.lastName ? students.lastName.toLowerCase().match(searchField.toLowerCase()) : null;

    return firstNameMatch || middleNameMatch || lastNameMatch;
  }
  onSortByClasses() {
    this.store.dispatch(toggleSortyByClasses())
  }
  onSortByAlphabet() {
    this.store.dispatch(toggleSortByAlphabet());
  }
  onSortByGender() {
    this.store.dispatch(toggleSortByGender())
  }
  onAddStudent() {
    this.store.dispatch(toggleAddModal())
  }
  onEditStudent(student: StudentModel) {
    // this.store.dispatch(editSt)
    // this.store.dispatch(toggleEditModal())
    this.studentsService.getStudentById(student).subscribe(console.log)
  }
  processSubmit(event) {
    this.onAddStudent();
  }
  onRemoveStudent(student: StudentModel) {
    console.log(student);
    this.store.dispatch(deleteStudentRequest({ student }))
  }
  onFinish() {
    this.store.dispatch(toggleEndModal())
  }

  constructor(private store: Store<StudentsStateModel>,
    private activatedRoute: ActivatedRoute,
    private studentCommunication: StudentsCommunicatorService,
    private studentsService: StudentsService
  ) { }
}
