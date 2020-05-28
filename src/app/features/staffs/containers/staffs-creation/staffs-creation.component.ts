import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StaffsService } from '../../services/staffs.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import { StaffModel } from '../../models/staff.model';
import { selectAllStaffs, selectStaffsModalsState, selectAllSubjects, selectAllClasses, selectClassesOfSubject, classesAndSubjectsAssoc } from '../../ngrx/selectors';
import { Observable } from 'rxjs';
import { StaffsModalsModel } from '../../models/staffs-modal.model';
import { toggleAddEditModal, setSelectedState, unSetSelectedState, addClassToSubjectRequest } from '../../ngrx/actions';
import { SubjectModel } from 'src/app/shared/models/_subject.model';
import { ClassModel } from 'src/app/shared/models/class.model';
import { withLatestFrom, map } from 'rxjs/operators';
import { SubjectClassesAssociation } from '../../models/subject-classes-association.model';

@Component({
  selector: 'edu-staffs-creation',
  templateUrl: './staffs-creation.component.html',
  styleUrls: ['./staffs-creation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StaffsCreationComponent implements OnInit {
  activatedRouteData = this.activatedRoute.snapshot.data;
  staffsModalsState: Observable<StaffsModalsModel>
  staffs: Observable<StaffModel[]>;
  subjects: Observable<SubjectModel[]>;
  classes: Observable<ClassModel[]>;
  currentlySelectedSubject: string;
  subjectClassesAssociation: Observable<SubjectClassesAssociation[]>
  sort = '';
  ngOnInit(): void {
    this.staffs = this.store.select(selectAllStaffs);
    this.staffsModalsState = this.store.select(selectStaffsModalsState);
    this.subjects = this.store.select(selectAllSubjects);
    this.classes = this.store.select(selectAllClasses);
    this.subjectClassesAssociation = this.store.select(classesAndSubjectsAssoc);
  }
  changeSort(sort) {
    this.sort = sort;
  }
  refreshClasses() {
    this.classes = this.store.select(selectAllClasses).pipe(
      withLatestFrom(this.store.select(selectClassesOfSubject, { subjectId: this.currentlySelectedSubject })),
      map(([allClasses, classesOfSubjects]) => {
        return this.transformClasses(allClasses, classesOfSubjects)
      })
    )
  }
  onEditStaff(staff: StaffModel) {
    this.store.dispatch(toggleAddEditModal());
  }
  onAddStaff() {
    this.store.dispatch(toggleAddEditModal());
  }
  onSelectSubject(subjectId: string) {
    this.store.dispatch(setSelectedState({ subjectId }))
    this.currentlySelectedSubject = subjectId;
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
      console.log(matched);
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
  onUnselectSubject(subjectId: string) {
    this.store.dispatch(unSetSelectedState({ subjectId }))
  }
  constructor(private store: Store<EntityState<StaffModel>>, private activatedRoute: ActivatedRoute) { }
}
