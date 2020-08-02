import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ConsoleClassesStateModel } from '../../models/console-classes-state.model';
import { Observable } from 'rxjs';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { selectAllClassesForSections, selectSelectedClassForSections, selectAggregatedSectionsData, selectAllStudentsForSections, selectAggregateByClassId, selectNotDraggedStudents, selectConsoleClasses, selectAggregate } from '../../ngrx/selectors/console-classes';
import { toggleSelectedState, fetchAllStudents, fetchAllClassesForSections, performSectionDrop, removeStudentsFromSection, addStudentToConsoleSection, addNewSectionToAggregate, createConsoleStudentRequest, addNewSectionToAggregateRequest, updateSectionName } from '../../ngrx/actions/console-classes/console-classes-groups.actions';
import { StaffModel } from 'src/app/shared/models/staff.model';
import { AggregatedResult } from '../../models/aggregated-result.model';
import { DraggedSectionModel } from 'src/app/shared/models/dragged-section.model';
import { StudentModel } from 'src/app/shared/models/student.model';
import { fetchSectionData } from '../../ngrx/actions/console-classes/console-sections.actions';
import { ISectionModel } from 'src/app/shared/models/section.model';

@Component({
  selector: 'edu-console-section-edit',
  templateUrl: './console-section-edit.component.html',
  styleUrls: ['./console-section-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsoleSectionEditComponent implements OnInit {
  isAddModalOpened = false;
  sortedClasses: Observable<ExtendedClassModel[]>
  notDraggedStudents: Observable<StaffModel[]>;
  allStudents: Observable<StaffModel[]>;
  allClasses: Observable<ExtendedClassModel[]>;
  selectedClass: Observable<ExtendedClassModel> | null;
  aggregatedData: Observable<AggregatedResult>;
  aggregate: Observable<AggregatedResult[]>;
  ngOnInit(): void {
    this.store.dispatch(fetchSectionData())
    this.store.dispatch(fetchAllStudents())
    this.store.dispatch(fetchAllClassesForSections())
    this.notDraggedStudents = this.store.select(selectNotDraggedStudents)
    this.allStudents = this.store.select(selectAllStudentsForSections);
    this.sortedClasses = this.store.select(selectAllClassesForSections);
    this.sortedClasses.subscribe(console.log)
    this.selectedClass = this.store.select(selectSelectedClassForSections);
    this.aggregatedData = this.store.select(selectAggregateByClassId)
    this.allClasses = this.store.select(selectAllClassesForSections);
    this.aggregate = this.store.select(selectAggregate);
    this.aggregate.subscribe(data => {
      console.log('hoooool', data);
    })
  }
  processAddSection(classId: string) {
    console.log(classId)
    this.store.dispatch(addNewSectionToAggregateRequest({ classId }))
  }
  toggleAddModal() {
    this.isAddModalOpened = !this.isAddModalOpened;
  }
  processSubmit(student: StudentModel) {
    this.store.dispatch(createConsoleStudentRequest({ student }))
    this.toggleAddModal()
  }
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
  changeSectionName(event) {
    console.log(event);
    this.store.dispatch(updateSectionName({ section: event.section, classId: event.classId, newName: event.newName }))
  }
  removeStudent(draggedData: DraggedSectionModel) {
    this.store.dispatch(removeStudentsFromSection({ draggedData }))
  }
  constructor(private router: Router, private store: Store<ConsoleClassesStateModel>) { }
}