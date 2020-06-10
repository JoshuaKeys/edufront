import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StudentsModalModel } from '../../models/students-modal.model';
import { Store } from '@ngrx/store';
import { StudentsStateModel } from '../../models/students-state.model';
import { selectModalState, selectSortingState, selectStudentsAndClasses } from '../../ngrx/selectors'
import { toggleStartModal, toggleAddModal, toggleEndModal } from '../../ngrx/actions/students-modal.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import { StudentsSortingModel } from '../../models/students-sorting.model';
import { toggleSortByAlphabet, toggleSortByGender, toggleSortyByClasses } from '../../ngrx/actions/students-sorting.actions';
import { StudentsXClassesModel } from '../../models/students-x-classes.model';
import { map, catchError } from 'rxjs/operators';
import { StudentModel } from '../../../../shared/models/student.model';
import { createStudentRequest, deleteStudentRequest } from '../../ngrx/actions/class-students.actions';
import { StudentsCommunicatorService } from '../../services/students-communicator.service';
import { incrementProgress } from 'src/app/features/dashboard/ngrx/actions';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  img;
  ngOnInit(): void {
    const headers = new HttpHeaders().set('Content-Type', 'application/image; charset=utf-8');
    this.httpClient.get('https://education.development.allexis.io/admin/image/profile/0ddcf2ee-9d85-4d25-9218-4a2c51d6f3f1.jpg', {
      headers, responseType: 'blob'
    })
      .subscribe(res => {
        console.log(res);
        var reader = new FileReader();
        reader.readAsDataURL(res);
        reader.onloadend = () => {
          var base64data = reader.result;
          this.img = base64data
        }
      })
    this.studentsModalState = this.store.select(selectModalState);
    this.sortingState = this.store.select(selectSortingState)
    this.studentsXClasses = this.store.select(selectStudentsAndClasses);
    this.studentCommunication.studentEdition$.subscribe(student => this.onEditStudent(student))
    this.studentCommunication.studentRemoval$.subscribe(student => this.onRemoveStudent(student))
  }
  goToDashboard() {
    this.router.navigateByUrl('/dashboard')
  }
  goToStaffs() {

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
    console.log(student);
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
  processSubmit(event: StudentModel) {
    this.createStudent(event)
  }

  onRemoveStudent(student: StudentModel) {
    this.store.dispatch(deleteStudentRequest({ student }))
  }
  onFinish() {
    this.store.dispatch(toggleEndModal())
    this.store.dispatch(incrementProgress())
  }

  constructor(private store: Store<StudentsStateModel>,
    private activatedRoute: ActivatedRoute,
    private studentCommunication: StudentsCommunicatorService,
    private studentsService: StudentsService,
    private router: Router,
    private httpClient: HttpClient
  ) { }
}
