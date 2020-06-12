import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { SectionsStateModel } from '../../models/sections-state.model';
import { toggleModal } from '../../ngrx/actions/sections-modal.actions';
import { Observable } from 'rxjs';
import { SectionsModalState } from '../../models/sections-modal-state.model';
import { selectModalState } from '../../ngrx/selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { getAllClassesRequest, toggleSelectedState, toggleStudentsDraggedState, createStudentRequest } from '../../ngrx/actions/classes.actions';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { selectSortedClasses, selectSelectedClass, selectNotDraggedStudents, selectSections, selectAllClasses } from '../../ngrx/selectors/classes.selectors';
import { ClassesModel } from '../../models/classes-model';
import { map } from 'rxjs/operators';
import { ClassModel } from 'src/app/shared/models/class.model';
import { ExtendedProfileDTOModel } from '../../models/extended-profiledto.model';
import { SectionModel } from '../../models/section.model';
import { addStudentToSection, removeStudentFromSection, addNewSection, assignStudentsRandomly, assignStudentsRequest, getAggregatedResult, changeSectionNameRequest } from '../../ngrx/actions/sections.actions';
import { StudentModel } from 'src/app/shared/models/student.model';

@Component({
  selector: 'edu-create-sections',
  templateUrl: './create-sections.component.html',
  styleUrls: ['./create-sections.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateSectionsComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data
  sectionsModalState: Observable<SectionsModalState>;
  sortedClassesStaffs: Observable<ClassesModel[]>;
  sortedClasses: Observable<ClassModel[]>
  notDraggedStudents: Observable<ExtendedProfileDTOModel[]>;
  draggedStudents: Observable<ExtendedProfileDTOModel[]>;
  selectedClass: Observable<ClassesModel> | null;
  selectedSections: Observable<SectionModel>
  allClasses: Observable<ClassesModel[]>;
  ngOnInit(): void {
    this.sectionsModalState = this.store.select(selectModalState);
    this.sortedClassesStaffs = this.store.select(selectSortedClasses)
    this.notDraggedStudents = this.store.select(selectNotDraggedStudents)
    this.selectedSections = this.store.select(selectSections);
    this.allClasses = this.store.select(selectAllClasses);
    this.allClasses.subscribe(x => console.log('hellooooo', x));
    this.sortedClasses = this.sortedClassesStaffs.pipe(
      map(sortedClasses => sortedClasses.map(classItem => classItem.class))
    );
    this.selectedClass = this.store.select(selectSelectedClass);
    this.selectedClass.subscribe(console.log)
    this.store.dispatch(getAllClassesRequest())
  }
  processDroppedStudent(payload: { student: ExtendedProfileDTOModel, classId: string, sectionName: string }) {
    this.store.dispatch(toggleStudentsDraggedState({ student: payload.student }))
    this.store.dispatch(addStudentToSection({ student: payload.student, sectionName: payload.sectionName, classId: payload.classId }))
  }
  onContinue() {
    this.store.dispatch(toggleModal({ modal: 'startModal' }))
  }
  processSubmit(student: StudentModel) {
    this.store.dispatch(createStudentRequest({ student }))
  }
  openAddModal() {
    this.store.dispatch(toggleModal({ modal: 'addModal' }))
  }
  processStudentRemoval(payload: { student: ExtendedProfileDTOModel, classId: string, sectionName: string }) {
    this.store.dispatch(removeStudentFromSection(payload))
    this.store.dispatch(toggleStudentsDraggedState({ student: payload.student }))
  }
  processAddSection(classId: string) {
    this.store.dispatch(addNewSection({ classId }))
  }
  goToConfirmation() {
    this.router.navigate(['../', this.activatedRouteData.next], { relativeTo: this.activatedRoute })
  }
  goToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
  onAssign(classId: string) {
    this.store.dispatch(assignStudentsRequest({ classId }))
  }
  onChangeGroupName(groupName: {
    oldName: string;
    newName: string;
    classId: string
  }) {
    this.store.dispatch(changeSectionNameRequest({
      sectionName: groupName.oldName,
      sectionNewName: groupName.newName,
      classId: groupName.classId
    }))
  }
  processClassClick(classGrade: string) {
    console.log(classGrade);
    this.store.dispatch(toggleSelectedState({ classGrade }))
  }
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private store: Store<SectionsStateModel>) { }
}
