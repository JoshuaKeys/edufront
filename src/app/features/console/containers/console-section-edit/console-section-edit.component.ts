import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConsoleClassesStateModel } from '../../models/console-classes-state.model';
import { Observable } from 'rxjs';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { selectAllClassesForSections, selectSelectedClassForSections, selectAggregatedSectionsData, selectAllStudentsForSections, selectAggregateByClassId, selectNotDraggedStudents } from '../../ngrx/selectors/console-classes';
import { toggleSelectedState, fetchAllStudents, fetchAllClassesForSections, performSectionDrop, removeStudentsFromSection, addStudentToConsoleSection, addNewSectionToAggregate } from '../../ngrx/actions/console-classes/console-classes-groups.actions';
import { StaffModel } from 'src/app/shared/models/staff.model';
import { AggregatedResult } from '../../models/aggregated-result.model';
import { DraggedSectionModel } from 'src/app/shared/models/dragged-section.model';

@Component({
  selector: 'edu-console-section-edit',
  templateUrl: './console-section-edit.component.html',
  styleUrls: ['./console-section-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleSectionEditComponent implements OnInit {
  sortedClasses: Observable<ExtendedClassModel[]>
  notDraggedStudents: Observable<StaffModel[]>;
  allStudents: Observable<StaffModel[]>;
  selectedClass: Observable<ExtendedClassModel> | null;
  aggregatedData: Observable<AggregatedResult>;
  ngOnInit(): void {
    this.store.dispatch(fetchAllStudents())
    this.store.dispatch(fetchAllClassesForSections())
    this.notDraggedStudents = this.store.select(selectNotDraggedStudents)
    this.allStudents = this.store.select(selectAllStudentsForSections);
    this.sortedClasses = this.store.select(selectAllClassesForSections);
    this.sortedClasses.subscribe(console.log)
    this.selectedClass = this.store.select(selectSelectedClassForSections);
    this.aggregatedData = this.store.select(selectAggregateByClassId)
  }
  // processSubmit(student: StudentModel) {
  //   this.store.dispatch(createStudentRequest({ student }))
  // }
  // openAddModal() {
  //   this.store.dispatch(toggleModal({ modal: 'addModal' }))
  // }
  processAddSection(classId: string) {
    console.log(classId)
    this.store.dispatch(addNewSectionToAggregate({ classId }))
  }
  // onAssign(classId: string) {
  //   this.store.dispatch(assignStudentsRequest({ classId }))
  // }
  handleDropped(draggedData: DraggedSectionModel) {
    if (draggedData.sectionName) {
      this.store.dispatch(performSectionDrop({ draggedData }))
      return;
    }
    this.store.dispatch(addStudentToConsoleSection({ draggedData }))
  }
  onChangeGroupName(groupName: {
    oldName: string;
    newName: string;
    classId: string
  }) {
  }
  processClassClick(classGrade: string) {
    this.store.dispatch(toggleSelectedState({ classGrade }))
  }
  removeStudent(draggedData: DraggedSectionModel) {
    this.store.dispatch(removeStudentsFromSection({ draggedData }))
  }
  constructor(private router: Router, private store: Store<ConsoleClassesStateModel>) { }
}
