import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { fetchGeneratedGroups, fetchGeneratedGroupsSuccess, fetchAllClasses, fetchAllClassesSuccess, deleteGroup, deleteGroupSuccess, deleteClass, deleteClassSuccess, fetchAllStudents, fetchAllStudentsSuccess, fetchAllClassesForSections, fetchAllClassesForSectionsSuccess, fetchAllClassesForSubjects, fetchAllClassesForSubjectsSuccess, fetchAllSubjects, fetchAllSubjectsSuccess, fetchAllClassesWithSubjects, removeFromSelectedConsoleSubjectsClassesRequest, removeFromSelectedConsoleSubjectsClasses, assignToSelectedConsoleSubjectsClasses, assignToSelectedConsoleSubjectsClassesRequest, createSubjectRequestFromConsole, createSubjectFromConsoleSuccess, createConsoleStudentRequest, createConsoleStudentSuccess, performSectionDrop, addStudentToConsoleSection, removeStudentsFromSection, addNewSectionToAggregate, fetchAssignedClasses, fetchAssignedClassesSuccess, addNewSectionToAggregateRequest, createGroupRequest, createGroup, addClasses, addClassesSuccess, sendGroupsWithClasses, sendGroupsWithClassesSuccess } from '../../actions/console-classes/console-classes-groups.actions';
import { ConsoleClassesService } from '../../../services/console-classes/console-classes.service';
import { mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ConsoleClassesStateModel } from '../../../models/console-classes-state.model';
import { selectConsoleClasses, selectConsoleSubjectsSelectedClasses, selectAggregatedSectionsData, selectSelectedClassForSections, selectConsoleGroups, selectConsoleAssignedClasses } from '../../selectors/console-classes';
import { of, forkJoin } from 'rxjs';
import { aggregateSectionData } from '../../../utilities';
import { fetchSectionData, aggregateSectionDataRequest, fetchSectionDataSuccess, aggregateSectionStudentsDataRequest } from '../../actions/console-classes/console-sections.actions';
import { StudentModel } from 'src/app/shared/models/student.model';
import { v4 } from 'uuid';
import { mapAlphaToNumeric } from 'src/app/shared/utilities/utilities';
import { SectionModel } from 'src/app/shared/models/section.model';
import { ClassGroupModel } from 'src/app/features/calender/models/class-group.model';
import { GroupWithClasses } from '../../../models/group-with-classes.model';
@Injectable()
export class ConsoleClassesEffects {
  fetchAllClasses$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAllClasses),
    withLatestFrom(this.store.select(selectConsoleClasses)),
    mergeMap(() => this.consoleClassesService.getClasses().pipe(
      map(classes => fetchAllClassesSuccess({ classes }))
    ))
  ))
  fetchAssignedClasses$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAssignedClasses),
    mergeMap(() => this.consoleClassesService.getAssignedClasses().pipe(
      map(classes => fetchAssignedClassesSuccess({ classes }))
    ))
  ))
  fetchGeneratedGroups$ = createEffect(() => this.actions$.pipe(
    ofType(fetchGeneratedGroups),
    mergeMap(action => this.consoleClassesService.getGeneratedGroups().pipe(
      map(generatedGroups => fetchGeneratedGroupsSuccess({ generatedGroups }))
    ))
  ));
  deleteGroupRequest$ = createEffect(() => this.actions$.pipe(
    ofType(deleteGroup),

    mergeMap(action => this.consoleClassesService.deleteGroup(action.group).pipe(
      map(resp => {
        console.log(resp);
        return deleteGroupSuccess({ group: action.group })
      })
    ))
  ))
  deleteClassRequest$ = createEffect(() => this.actions$.pipe(
    ofType(deleteClass),
    withLatestFrom(this.store.select(selectConsoleAssignedClasses)),
    mergeMap(([action, assignedClasses]) => {
      const assignedMatch = assignedClasses.findIndex(classItem => classItem.grade === action.class.grade);
      return this.consoleClassesService.deleteClass(action.class).pipe(
        map(resp => deleteClassSuccess({ classItem: assignedClasses[assignedMatch] }))
      )
    })
  ));
  getSectionData$ = createEffect(() => this.actions$.pipe(
    ofType(fetchSectionData),
    mergeMap(action => {
      return forkJoin(this.consoleClassesService.getSectionData(), this.consoleClassesService.getAssignedClasses()).pipe(
        map(([sections, classes]) => {
          return aggregateSectionDataRequest({ sections, classes })
        })
      )
    })
  ))
  aggregateSectionDataRequest$ = createEffect(() => this.actions$.pipe(
    ofType(aggregateSectionDataRequest),
    mergeMap(({ sections, classes }) => {
      return forkJoin(sections.map(section => this.consoleClassesService.getStudentsInSection(section))
      ).pipe(
        map(students => {
          const strippedDownStudents = students.reduce((prev, curr) => {
            curr.forEach(item => {
              prev.push(item);
            })
            return prev;
          }, [])
          return fetchSectionDataSuccess({ sections: aggregateSectionData(sections, classes, strippedDownStudents) });
        })
      )
    })
  ));
  fetchAllStudents$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAllStudents),
    mergeMap(action => this.consoleClassesService.getAllStudents().pipe(
      map(students => fetchAllStudentsSuccess({ students }))
    ))
  ))
  fetchAllClassesForSections$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAllClassesForSections),
    withLatestFrom(this.store.select(selectConsoleAssignedClasses)),
    mergeMap(([action, classes]) => {
      if (classes.length) {
        return of(fetchAllClassesForSectionsSuccess({ classes }));
      }
      return this.consoleClassesService.getAssignedClasses().pipe(
        map(classes => fetchAllClassesForSectionsSuccess({ classes }))
      );
    })
  ));
  createClassGroupRequest$ = createEffect(() => this.actions$.pipe(
    ofType(createGroupRequest),
    withLatestFrom(this.store.select(selectConsoleGroups)),
    mergeMap(([action, groups]) => {
      const groupName = `Default Group ${groups.length + 1}`;
      const groupObj: ClassGroupModel = {
        groupName
      }
      return this.consoleClassesService.createGroup(groupObj).pipe(
        map(group => createGroup({ group }))
      )
    })
  ))
  addNewSectionToAggregate$ = createEffect(() => this.actions$.pipe(
    ofType(addNewSectionToAggregateRequest),
    withLatestFrom(this.store.select(selectAggregatedSectionsData), this.store.select(selectSelectedClassForSections)),
    mergeMap(([action, aggregateData, selectedClass]) => {
      const selectedAggregate = aggregateData.findIndex(aggregateItem => aggregateItem.classItem.id === selectedClass.id);
      let sectionName;
      if (aggregateData[selectedAggregate]) {
        sectionName = mapAlphaToNumeric()[aggregateData[selectedAggregate].sections.length + 1].toUpperCase();
      } else {
        sectionName = 'A'
      }

      const sectionObj = {
        classId: selectedClass.id,
        sectionName
      };
      return this.consoleClassesService.addNewSection(sectionObj).pipe(
        map(section => addNewSectionToAggregate({ section }))
      );
    })
  ))
  fetchAllClassesForSubjects$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAllClassesForSubjects),
    withLatestFrom(this.store.select(selectConsoleAssignedClasses)),
    mergeMap(([action, classes]) => {
      if (classes.length) {
        return of(fetchAllClassesWithSubjects({ classes }))
        // return of(fetchAllClassesForSubjectsSuccess({ classes }))
      }
      return this.consoleClassesService.getAssignedClasses().pipe(
        map(classes => fetchAllClassesWithSubjects({ classes }))
      )
    })
  ))
  fetchAllClassesWithSubjects$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAllClassesWithSubjects),
    mergeMap(action => forkJoin(action.classes.map(classItem => this.consoleClassesService.getFullClass(classItem))).pipe(
      map(classes => fetchAllClassesForSubjectsSuccess({ classes }))
    ))
  ))
  fetchAllSubjects$ = createEffect(() => this.actions$.pipe(
    ofType(fetchAllSubjects),
    mergeMap(action => this.consoleClassesService.getAllSubjects().pipe(
      map(subjects => fetchAllSubjectsSuccess({ subjects }))
    ))
  ))
  removeFromSelectedClassesRequest$ = createEffect(() => this.actions$.pipe(
    ofType(removeFromSelectedConsoleSubjectsClassesRequest),
    withLatestFrom(this.store.select(selectConsoleSubjectsSelectedClasses)),
    mergeMap(([action, selectedClasses]) => {
      return forkJoin(selectedClasses.map(classItem => this.consoleClassesService.deleteSubjectFromClass(classItem.id, action.subject.id))).pipe(
        map((response) => {
          if (selectedClasses.length > 0) {
            return removeFromSelectedConsoleSubjectsClasses({ selectedClasses, subject: action.subject })
          }
        })
      )
    })
  ))
  createSubjectRequest$ = createEffect(() => this.actions$.pipe(
    ofType(createSubjectRequestFromConsole),
    mergeMap(action => {
      return this.consoleClassesService.createSubject(action.subject).pipe(
        map(subject => createSubjectFromConsoleSuccess({ subject }))
      )
    })
  ));
  assignToSelectedConsoleSubjectsClassesRequest$ = createEffect(() => this.actions$.pipe(
    ofType(assignToSelectedConsoleSubjectsClassesRequest),
    withLatestFrom(this.store.select(selectConsoleSubjectsSelectedClasses)),
    mergeMap(([action, selectedClasses]) => {
      return forkJoin(selectedClasses.map(classItem => this.consoleClassesService.assignSubjectToClass(classItem, action.subject))).pipe(
        map((response) => {
          if (selectedClasses.length > 0) {
            return assignToSelectedConsoleSubjectsClasses({ selectedClasses, subject: action.subject });
          }
        })
      )
    })
  ))
  createConsoleStudentRequest$ = createEffect(() => this.actions$.pipe(
    ofType(createConsoleStudentRequest),
    mergeMap(action => {
      const studentReqData = this.processStudentReqData(action.student);
      if (studentReqData.profileDto.profileImage) {
        return this.consoleClassesService.uploadLogo(studentReqData.profileDto.profileImage['acceptedFile']).pipe(
          mergeMap(res => {
            const createStudentReqObj = this.composeCreateStudentData(studentReqData, res.file);
            return this.consoleClassesService.createStudent(createStudentReqObj).pipe(
              mergeMap(student => [createConsoleStudentSuccess({ student }),])
              // toggleModal({ modal: 'addModal' })
            )
          })
        )
      }
      const createStudentReqObj = this.composeCreateStudentData(studentReqData, null);
      return this.consoleClassesService.createStudent(studentReqData).pipe(
        mergeMap(student => [createConsoleStudentSuccess({ student })])
        // toggleModal({ modal: 'addModal' })
      )
    })
  ))
  addClasses$ = createEffect(() => this.actions$.pipe(
    ofType(addClasses),
    mergeMap(action => this.consoleClassesService.addMultiClasses(action.classes).pipe(
      map(classes => addClassesSuccess({ classes }))
    ))
  ))
  performSectionDrop$ = createEffect(() => this.actions$.pipe(
    ofType(performSectionDrop, addStudentToConsoleSection),
    mergeMap(action => {
      const id = action.draggedData.student.id;
      const sectionId = action.draggedData.newSectionId;
      return this.consoleClassesService.updateSectionData(sectionId, id)
    })
  ), { dispatch: false })
  removeStudentFromSection$ = createEffect(() => this.actions$.pipe(
    ofType(removeStudentsFromSection),
    mergeMap(action => {
      const sectionId = v4()
      return this.consoleClassesService.updateSectionData(sectionId, action.draggedData.student.id)
    })
  ), { dispatch: false })
  sendGroupsWithClasses$ = createEffect(() => this.actions$.pipe(
    ofType(sendGroupsWithClasses),
    withLatestFrom(this.store.select(selectConsoleGroups)),
    mergeMap(([action, groups]) => {
      const groupsCopy = JSON.parse(JSON.stringify(groups));
      const groupData: GroupWithClasses[] = groupsCopy.map(group => {
        const classes = group.classes.map(classItem => classItem.id);
        delete group.classes;
        group.classIds = classes;
        return group;
      })

      return this.consoleClassesService.sendGroupData(groupData).pipe(
        map(groups => sendGroupsWithClassesSuccess({ groups }))
      );
    })
  ))
  processguardianDetailsDto(student: StudentModel) {
    let studentCopy: StudentModel = {
      ...student,
      guardianDetailsDto: {
        ...student.guardianDetailsDto
      }
    }
    if (!studentCopy.guardianDetailsDto.email) {
      delete studentCopy.guardianDetailsDto.email
    }
    if (!studentCopy.guardianDetailsDto.familyName) {
      delete studentCopy.guardianDetailsDto.familyName
    }
    if (!studentCopy.guardianDetailsDto.firstName) {
      delete studentCopy.guardianDetailsDto.firstName
    }
    if (!studentCopy.guardianDetailsDto.middleName) {
      delete studentCopy.guardianDetailsDto.middleName
    }
    if (!studentCopy.guardianDetailsDto.phone) {
      delete studentCopy.guardianDetailsDto.phone
    }
    if (!studentCopy.guardianDetailsDto.id) {
      delete studentCopy.guardianDetailsDto.id
    }
    return studentCopy
  }
  processProfileDTO(student: StudentModel) {
    let studentCopy: StudentModel = {
      ...student,
      profileDto: { ...student.profileDto }
    }
    if (studentCopy.profileDto.profileImage == null) {
      delete studentCopy.profileDto.profileImage;
    }
    if (!studentCopy.profileDto.address) {
      delete studentCopy.profileDto.address;
    }
    if (!studentCopy.profileDto.id) {
      delete studentCopy.profileDto.id;
    }
    if (!studentCopy.profileDto.city) {
      delete studentCopy.profileDto.city
    }
    if (!studentCopy.profileDto.classId) {
      delete studentCopy.profileDto.classId
    }
    if (!studentCopy.profileDto['familyName']) {
      delete studentCopy.profileDto['familyName']
    }
    if (!studentCopy.profileDto.firstName) {
      delete studentCopy.profileDto.firstName
    }
    if (!studentCopy.profileDto.lastName) {
      delete studentCopy.profileDto.lastName
    }
    if (!studentCopy.profileDto.middleName) {
      delete studentCopy.profileDto.middleName
    }
    if (!studentCopy.profileDto.state) {
      delete studentCopy.profileDto.state
    }
    if (!studentCopy.profileDto.zipcode) {
      delete studentCopy.profileDto.zipcode
    }
    if (!studentCopy.profileDto.gender) {
      delete studentCopy.profileDto.gender
    }
    if (!studentCopy.profileDto.rollNumber) {
      delete studentCopy.profileDto.rollNumber
    }
    return studentCopy;
  }

  composeCreateStudentData(student: StudentModel, file: string) {
    console.log(student, file);
    const studentCopy: StudentModel = { ...student, };
    if (studentCopy.profileDto.profileImage) {
      studentCopy.profileDto.profileImage = file;
    }
    if (studentCopy.guardianDetailsDto.phone) {
      studentCopy.guardianDetailsDto.phone = student.guardianDetailsDto.phone['phoneNum']
    }
    if (studentCopy.profileDto['country']) {
      studentCopy.profileDto.countryId = student.profileDto['country'].id
    }
    return studentCopy
  }
  processStudentReqData(student: StudentModel) {
    const processedProfileDTO = this.processProfileDTO(student);
    const processguardianDetailsDto = this.processguardianDetailsDto(processedProfileDTO);
    return processguardianDetailsDto;
  }

  constructor(
    private actions$: Actions,
    private consoleClassesService: ConsoleClassesService,
    private store: Store<ConsoleClassesStateModel>
  ) { }
}




