import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { StaffModel } from '../../../../shared/models/staff.model';
import {
  selectAllStaffs,
  selectStaffsModalsState,
  selectAllSubjects,
  selectAllClasses,
  selectClassesOfSubject,
  classesAndSubjectsAssoc,
  selectSortingData,
  selectEditData
} from '../../ngrx/selectors';
import { Observable } from 'rxjs';
import { StaffsModalsModel } from '../../models/staffs-modal.model';
import {
  toggleAddModal,
  setSelectedState,
  unSetSelectedState,
  addClassToSubjectRequest,
  createStaffRequest,
  toggleSortByGender,
  toggleSortByAlphabet,
  deleteStaffRequest,
  toggleEndModal,
  toggleStartModal,
  fetchStaffById,
  editStaffRequest,
  toggleEditModal,
} from '../../ngrx/actions';
import { SubjectModel } from 'src/app/shared/models/_subject.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { withLatestFrom, map, filter, tap } from 'rxjs/operators';
import { SubjectClassesAssociation } from '../../models/subject-classes-association.model';
import { StaffFormModel } from '../../models/staff-form.model'
import { SortingModel } from '../../models/sorting-state.model';
import { StaffsCommunicatorService } from '../../services/staffs-communication.service';
import { incrementProgress } from 'src/app/features/dashboard/ngrx/actions';

@Component({
  selector: 'edu-staffs-creation',
  templateUrl: './staffs-creation.component.html',
  styleUrls: ['./staffs-creation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    StaffsCommunicatorService
  ]
})
export class StaffsCreationComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  staffsModalsState: Observable<StaffsModalsModel>
  staffs: Observable<StaffModel[]>;
  subjects: Observable<SubjectModel[]>;
  classes: Observable<ClassModel[]>;
  currentlySelectedSubject: string;
  subjectClassesAssociation: Observable<SubjectClassesAssociation[]>
  sortingState: Observable<SortingModel>;
  selectEditState: Observable<StaffModel>;
  @ViewChild('searchInput') searchInput;

  ngOnInit(): void {
    this.staffs = this.store.select(selectAllStaffs);
    this.staffsModalsState = this.store.select(selectStaffsModalsState);
    this.subjects = this.store.select(selectAllSubjects);
    this.classes = this.store.select(selectAllClasses);
    this.subjectClassesAssociation = this.store.select(classesAndSubjectsAssoc);
    this.sortingState = this.store.select(selectSortingData)
    this.staffsCommunicator.staffEdition$.subscribe(staff => this.onEditStaff(staff))
    this.staffsCommunicator.staffRemoval$.subscribe(staff => this.onRemoveStaff(staff))
    this.selectEditState = this.store.select(selectEditData);
  }

  onTextChange(event) {
    const searchField = event.target.value;
    this.staffs = this.store.select(selectAllStaffs).pipe(
      map(staffs => staffs.filter(staff => this.matchByAllNameTypes(staff, searchField)))
    )
  }

  matchByAllNameTypes(staff: StaffModel, searchField) {
    const firstNameMatch = staff.firstName ? staff.firstName.toLowerCase().match(searchField.toLowerCase()) : null;
    const middleNameMatch = staff.middleName ? staff.middleName.toLowerCase().match(searchField.toLowerCase()) : null;
    const lastNameMatch = staff.lastName ? staff.lastName.toLowerCase().match(searchField.toLowerCase()) : null;

    return firstNameMatch || middleNameMatch || lastNameMatch
  }

  createStaff(staff: StaffFormModel) {
    this.store.dispatch(createStaffRequest({ staff }))
  }

  onSortByGender() {
    this.store.dispatch(toggleSortByGender())
  }

  onSortByAlphabet() {
    this.store.dispatch(toggleSortByAlphabet())
  }

  refreshClasses() {
    this.classes = this.store.select(selectAllClasses).pipe(
      withLatestFrom(this.store.select(selectClassesOfSubject, { subjectId: this.currentlySelectedSubject })),
      map(([allClasses, classesOfSubjects]) => {
        return this.transformClasses(allClasses, classesOfSubjects)
      })
    )
  }
  closeEditModal() {
    this.store.dispatch(toggleEditModal())
  }
  closeAddModal() {
    this.store.dispatch(toggleAddModal())
  }
  onEditStaff(staff: StaffModel) {
    this.store.dispatch(fetchStaffById({ staff }))
  }
  processEditStaff(staff: StaffFormModel) {
    this.store.dispatch(editStaffRequest({ staff }))
  }
  onRemoveStaff(staff: StaffModel) {
    this.store.dispatch(deleteStaffRequest({ staff }))
  }

  onAddStaff() {
    this.store.dispatch(toggleAddModal());
  }

  onSelectSubject(subjectId: string) {
    this.store.dispatch(setSelectedState({ subjectId }))
    this.currentlySelectedSubject = subjectId;
    this.refreshClasses();
  }
  onFinish() {
    this.store.dispatch(toggleEndModal())
    this.store.dispatch(incrementProgress())
  }

  onSetActiveSubject(subject: { id: string; title: string; classes: string[] }) {
    this.store.dispatch(setSelectedState({ subjectId: subject.id }))
    this.currentlySelectedSubject = subject.id;
    this.refreshClasses();
  }
  transformClasses(allClasses, classesOfSubjects) {
    if (!classesOfSubjects) {
      return allClasses
    }
    return allClasses.map((classItem) => {
      let classesOfSub = (<SubjectClassesAssociation>classesOfSubjects).classes;
      let matched = false;
      for (let i = 0; i < classesOfSub.length; i++) {
        if (classItem.id === classesOfSub[i].id) {
          matched = true;
        }
      }
      if (!matched) {
        return classItem;
      }
      const classItemCopy = JSON.parse(JSON.stringify(classItem));
      classItemCopy.selected = true;
      return classItemCopy;
    });
  }

  onClassClicked(classItem: ClassModel) {
    this.store.dispatch(addClassToSubjectRequest({ class: classItem }))
    this.refreshClasses()
  }
  onStart() {
    this.store.dispatch(toggleStartModal())
  }

  onUnselectSubject(subjectId: string) {
    this.store.dispatch(unSetSelectedState({ subjectId }))
  }
  get startDescription() {
    return ``
  }
  get endDescription() {
    return `
      You are done with profile uploads, we promise! Now we can start putting
      things together. Whenever you are ready, go to the next step where we will
      organ your sections
    `;
  }
  goToDashboard() {
    this.router.navigateByUrl('/dashboard')
  }
  goToSections() {
    this.router.navigateByUrl('sections/create-sections')
  }
  constructor(
    private store: Store<EntityState<StaffModel>>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private staffsCommunicator: StaffsCommunicatorService
  ) { }
}
