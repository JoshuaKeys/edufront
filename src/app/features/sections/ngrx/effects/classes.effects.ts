import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  getAllClassesRequest,
  getAllClassesSuccess,
  toggleSelectedState,
  doNothing,
  setClassStudents,
  createStudentRequest,
  createStudentSuccess
} from '../actions/classes.actions';
import { mergeMap, map, withLatestFrom, tap } from 'rxjs/operators';
import { SectionsService } from '../../services/sections.service';
import { ClassesModel } from '../../models/classes-model';
import {
  selectSelectedClass,
  selectAllClasses,
  selectNotDraggedStudents,
  selectSections
} from '../selectors/classes.selectors';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { SectionsStateModel } from '../../models/sections-state.model';
import { ProfileDTOModel } from 'src/app/shared/models/profile-dto.model';
import { ExtendedProfileDTOModel } from '../../models/extended-profiledto.model';
import {
  initFirstSection,
  autoAssignStudentsToSections,
  setSection,
  setAllStudentDraggedState
} from '../actions/sections.actions';
import { ExtendedClassModel } from 'src/app/features/subjects/models/extend-class.model';
import { StudentsService } from 'src/app/features/students/services/students.service';
import { StudentModel } from 'src/app/shared/models/student.model';
import { toggleModal } from '../actions/sections-modal.actions';
import { UtilsService } from 'src/app/shared/services/utils.service';
@Injectable()
export class ClassesEffects {
  // initStudentsXClasses$ = createEffect(() => this.actions$.pipe(
  //   ofType(initClassesAndStudentsRequest),
  //   mergeMap((action) => forkJoin(this.studentsService.getAllClasses(), this.studentsService.getAllStudents()).pipe(
  //     mergeMap(([classes, students]) => {
  //       const mappedStudents = students.map(student => {
  //         for (let i = 0; i < classes.length; i++) {
  //           if (classes[i].id === student.classId) {
  //             student.className = classes[i].name;
  //             break;
  //           }
  //         }
  //         return student;
  //       })
  //       return [
  //         // initClassesAndStudentsResponse({ studentsXclasses: mappedStudents }),
  //         // fetchedClassesSuccess({ classes }),
  //         // fetchedStudentsSuccess({ students: students.map(student => ({ profileDto: student })) })
  //       ]
  //     })
  //   )),
  // ))
  // initStudentsXClasses$ = createEffect(() => this.actions$.pipe(
  //   ofType()
  // ))

  autoAssignStudents = createEffect(() =>
    this.actions$.pipe(
      ofType(autoAssignStudentsToSections),
      withLatestFrom(
        this.store.select(selectNotDraggedStudents),
        this.store.select(selectSections)
      ),
      mergeMap(([action, unSelectedStudents, sectionsObj]) => {
        let sections = this.utils.autoAssignToSections(
          <any>sectionsObj.sections,
          unSelectedStudents
        );
        console.log(sectionsObj, sections);
        return [
          setSection({ classId: sectionsObj.classId, sections }),
          setAllStudentDraggedState({
            classId: sectionsObj.classId,
            state: true
          })
        ];
      })
    )
  );

  getAllClassesRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllClassesRequest),
      withLatestFrom(this.store.select(selectAllClasses)),
      mergeMap(([action, allClasses]) => {
        let classStaffObj: ClassesModel[];
        if (allClasses.length > 0) {
          classStaffObj = allClasses.map(classItem => ({
            class: classItem.class,
            students: classItem.students
          }));
          return of(getAllClassesSuccess({ classes: classStaffObj }));
        }
        return this.sectionsService.getClasses().pipe(
          map(classes => {
            const classStaffObj: ClassesModel[] = classes.map(classItem => ({
              class: classItem
            }));
            return getAllClassesSuccess({ classes: classStaffObj });
          })
        );
      })
    )
  );
  toggleSelectedState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleSelectedState),
      withLatestFrom(this.store.select(selectSelectedClass)), // Typescript bug
      mergeMap(([action, selectedClass]) => {
        if (!selectedClass) {
          return of(doNothing());
        }
        if (!selectedClass.students) {
          console.log(action.classGrade, selectedClass.class.id);
          return this.sectionsService
            .getStudents(selectedClass.class.id)
            .pipe(
              mergeMap((students: ExtendedProfileDTOModel[]) => [
                setClassStudents({ classId: selectedClass.class.id, students }),
                initFirstSection({ classId: selectedClass.class.id })
              ])
            );
        }
        return of(doNothing()); // Up for debate
      })
    )
  );
  createStudentRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createStudentRequest),
      mergeMap(action => {
        const studentReqData = this.processStudentReqData(action.student);
        if (studentReqData.profileDto.profileImage) {
          return this.studentsService
            .uploadLogo(studentReqData.profileDto.profileImage['acceptedFile'])
            .pipe(
              mergeMap(res => {
                const createStudentReqObj = this.composeCreateStudentData(
                  studentReqData,
                  res.file
                );
                return this.studentsService
                  .createStudent(createStudentReqObj)
                  .pipe(
                    mergeMap(student => [
                      createStudentSuccess({ student }),
                      toggleModal({ modal: 'addModal' })
                    ])
                  );
              })
            );
        }
        const createStudentReqObj = this.composeCreateStudentData(
          studentReqData,
          null
        );
        return this.studentsService
          .createStudent(studentReqData)
          .pipe(
            mergeMap(student => [
              createStudentSuccess({ student }),
              toggleModal({ modal: 'addModal' })
            ])
          );
      })
    )
  );
  composeCreateStudentData(student: StudentModel, file: string) {
    console.log(student, file);
    const studentCopy: StudentModel = { ...student };
    if (studentCopy.profileDto.profileImage) {
      studentCopy.profileDto.profileImage = file;
    }
    if (studentCopy.guardianDetailsDto.phone) {
      studentCopy.guardianDetailsDto.phone =
        student.guardianDetailsDto.phone['phoneNum'];
    }
    if (studentCopy.profileDto['country']) {
      studentCopy.profileDto.countryId = student.profileDto['country'].id;
    }
    return studentCopy;
  }
  processStudentReqData(student: StudentModel) {
    const processedProfileDTO = this.processProfileDTO(student);
    const processguardianDetailsDto = this.processguardianDetailsDto(
      processedProfileDTO
    );
    return processguardianDetailsDto;
  }
  processguardianDetailsDto(student: StudentModel) {
    let studentCopy: StudentModel = {
      ...student,
      guardianDetailsDto: {
        ...student.guardianDetailsDto
      }
    };
    if (!studentCopy.guardianDetailsDto.email) {
      delete studentCopy.guardianDetailsDto.email;
    }
    if (!studentCopy.guardianDetailsDto.familyName) {
      delete studentCopy.guardianDetailsDto.familyName;
    }
    if (!studentCopy.guardianDetailsDto.firstName) {
      delete studentCopy.guardianDetailsDto.firstName;
    }
    if (!studentCopy.guardianDetailsDto.middleName) {
      delete studentCopy.guardianDetailsDto.middleName;
    }
    if (!studentCopy.guardianDetailsDto.phone) {
      delete studentCopy.guardianDetailsDto.phone;
    }
    if (!studentCopy.guardianDetailsDto.id) {
      delete studentCopy.guardianDetailsDto.id;
    }
    return studentCopy;
  }
  processProfileDTO(student: StudentModel) {
    let studentCopy: StudentModel = {
      ...student,
      profileDto: { ...student.profileDto }
    };
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
      delete studentCopy.profileDto.city;
    }
    if (!studentCopy.profileDto.classId) {
      delete studentCopy.profileDto.classId;
    }
    if (!studentCopy.profileDto['familyName']) {
      delete studentCopy.profileDto['familyName'];
    }
    if (!studentCopy.profileDto.firstName) {
      delete studentCopy.profileDto.firstName;
    }
    if (!studentCopy.profileDto.lastName) {
      delete studentCopy.profileDto.lastName;
    }
    if (!studentCopy.profileDto.middleName) {
      delete studentCopy.profileDto.middleName;
    }
    if (!studentCopy.profileDto.state) {
      delete studentCopy.profileDto.state;
    }
    if (!studentCopy.profileDto.zipcode) {
      delete studentCopy.profileDto.zipcode;
    }
    if (!studentCopy.profileDto.gender) {
      delete studentCopy.profileDto.gender;
    }
    if (!studentCopy.profileDto.rollNumber) {
      delete studentCopy.profileDto.rollNumber;
    }
    return studentCopy;
  }
  constructor(
    private sectionsService: SectionsService,
    private store: Store<SectionsStateModel>,
    private actions$: Actions,
    private studentsService: StudentsService,
    private utils: UtilsService
  ) {}
}
