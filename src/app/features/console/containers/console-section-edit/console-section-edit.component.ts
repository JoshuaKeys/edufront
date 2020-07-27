import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConsoleClassesStateModel } from '../../models/console-classes-state.model';
import { ExtendedProfileDTOModel } from 'src/app/shared/models/extended-profiledto.model';
import { Observable } from 'rxjs';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { selectAllClassesForSections, selectSelectedClassForSections, selectAggregatedSectionsData, selectAllStudentsForSections, selectAggregateByClassId, selectNotDraggedStudents } from '../../ngrx/selectors/console-classes';
import { toggleSelectedState, fetchAllStudents, fetchAllClassesForSections } from '../../ngrx/actions/console-classes/console-classes-groups.actions';
import { StaffModel } from 'src/app/shared/models/staff.model';
import { AggregatedResult } from '../../models/aggregated-result.model';

@Component({
  selector: 'edu-console-section-edit',
  templateUrl: './console-section-edit.component.html',
  styleUrls: ['./console-section-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleSectionEditComponent implements OnInit {
  // activatedRouteData = this.activatedRoute.snapshot.data
  // sectionsModalState: Observable<SectionsModalState>;
  // sortedClassesStaffs: Observable<ClassesModel[]>;
  sortedClasses: Observable<ExtendedClassModel[]>
  notDraggedStudents: Observable<StaffModel[]>;
  allStudents: Observable<StaffModel[]>;
  // draggedStudents: Observable<ExtendedProfileDTOModel[]>;
  selectedClass: Observable<ExtendedClassModel> | null;
  // selectedSections: Observable<SectionModel>
  // allClasses: Observable<ClassModel[]>;
  aggregatedData: Observable<AggregatedResult>;
  ngOnInit(): void {
    this.store.dispatch(fetchAllStudents())
    this.store.dispatch(fetchAllClassesForSections())
    // this.sectionsModalState = this.store.select(selectModalState);
    // this.sortedClassesStaffs = this.store.select(selectSortedClasses)
    this.notDraggedStudents = this.store.select(selectNotDraggedStudents)
    this.allStudents = this.store.select(selectAllStudentsForSections);
    // this.selectedSections = this.store.select(selectSections);
    // this.allClasses = this.store.select(selectAllClasses).pipe(
    //   map(classes => classes.map(classItem => classItem.class))
    // )
    this.sortedClasses = this.store.select(selectAllClassesForSections);
    this.sortedClasses.subscribe(console.log)
    this.selectedClass = this.store.select(selectSelectedClassForSections);
    this.aggregatedData = this.store.select(selectAggregateByClassId)
    this.aggregatedData.subscribe(x => console.log('aggreee', x))
    // this.selectedClass.subscribe(console.log)
    // this.store.dispatch(getAllClassesRequest())
  }
  // closeAddModal() {
  //   this.store.dispatch(toggleModal({ modal: 'addModal' }))
  // }
  processDroppedStudent(payload: { student: ExtendedProfileDTOModel, classId: string, sectionName: string }) {
    // this.store.dispatch(toggleStudentsDraggedState({ student: payload.student }))
    // this.store.dispatch(addStudentToSection({ student: payload.student, sectionName: payload.sectionName, classId: payload.classId }))
  }
  // onContinue() {
  //   this.store.dispatch(toggleModal({ modal: 'startModal' }))
  // }
  // processSubmit(student: StudentModel) {
  //   this.store.dispatch(createStudentRequest({ student }))
  // }
  // openAddModal() {
  //   this.store.dispatch(toggleModal({ modal: 'addModal' }))
  // }
  processStudentRemoval(payload: { student: ExtendedProfileDTOModel, classId: string, sectionName: string }) {
    // this.store.dispatch(removeStudentFromSection(payload))
    // this.store.dispatch(toggleStudentsDraggedState({ student: payload.student }))
  }
  processAddSection(classId: string) {
    // this.store.dispatch(addNewSection({ classId }))
  }
  // goToConfirmation() {
  //   this.router.navigate(['../', this.activatedRouteData.next], { relativeTo: this.activatedRoute })
  // }
  // goToDashboard() {
  //   this.router.navigateByUrl('/dashboard');
  // }
  // onAssign(classId: string) {
  //   this.store.dispatch(assignStudentsRequest({ classId }))
  // }
  onChangeGroupName(groupName: {
    oldName: string;
    newName: string;
    classId: string
  }) {
    // this.store.dispatch(changeSectionNameRequest({
    //   sectionName: groupName.oldName,
    //   sectionNewName: groupName.newName,
    //   classId: groupName.classId
    // }))
  }
  processClassClick(classGrade: string) {
    // console.log(classGrade);
    // this.store.dispatch(toggleSelectedState({ classGrade }))
    this.store.dispatch(toggleSelectedState({ classGrade }))
  }
  constructor(private router: Router, private store: Store<ConsoleClassesStateModel>) { }
}
