import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StudentsService } from '../services/students.service';
import { mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { initClassesAndStudentsResponse, initClassesAndStudentsRequest, fetchedClassesSuccess, fetchedStudentsSuccess, createStudentRequest, createStudentSuccess, deleteStudentRequest, deleteStudentSuccess, fetchStudentByIdRequest, fetchStudentByIdResponse, editStudentRequest, editStudentResponse } from './actions/class-students.actions';
import { toggleAddModal, toggleEditModal } from './actions/students-modal.actions';
import { Store } from '@ngrx/store';
import { StudentsStateModel } from '../models/students-state.model';
import { selectAllStudents, selectAllClasses } from './selectors';
import { StudentsXClassesModel } from '../models/students-x-classes.model';
import { StudentModel } from 'src/app/shared/models/student.model';

@Injectable()
export class StudentsEffects {
  initStudentsXClasses$ = createEffect(() => this.actions$.pipe(
    ofType(initClassesAndStudentsRequest),
    mergeMap((action) => forkJoin(this.studentsService.getAllClasses(), this.studentsService.getAllStudents()).pipe(
      mergeMap(([classes, students]) => {
        const mappedStudents = students.map(student => {
          for (let i = 0; i < classes.length; i++) {
            if (classes[i].id === student.classId) {
              student.className = classes[i].name;
              break;
            }
          }
          return student;
        })
        return [
          initClassesAndStudentsResponse({ studentsXclasses: mappedStudents }),
          fetchedClassesSuccess({ classes }),
          fetchedStudentsSuccess({ students: students.map(student => ({ profileDto: student })) })
        ]
      })
    )),
  ))
  fetchStudentData$ = createEffect(() => this.actions$.pipe(
    ofType(fetchStudentByIdRequest),
    mergeMap(action => this.studentsService.getStudentById(action.student).pipe(
      mergeMap(student => [fetchStudentByIdResponse({ student }), toggleEditModal()])
    ))
  ))
  refreshStudentsXClasses$ = createEffect(() => this.actions$.pipe(
    ofType(createStudentSuccess),
    withLatestFrom(this.store.select(selectAllStudents), this.store.select(selectAllClasses)),
    map(([action, students, classes]) => {
      const mappedStudents = <any>students.map(student => {
        student = JSON.parse(JSON.stringify(student));
        for (let i = 0; i < classes.length; i++) {
          if (classes[i].id === student.profileDto.classId) {
            (student.profileDto as StudentsXClassesModel).className = classes[i].name;
            break;
          }
        }
        return student.profileDto;
      })
      return initClassesAndStudentsResponse({ studentsXclasses: mappedStudents });
    })
  ))
  createStudentRequest$ = createEffect(() => this.actions$.pipe(
    ofType(createStudentRequest),
    mergeMap(action => {
      const studentReqData = this.processStudentReqData(action.student);
      if (studentReqData.profileDto.profileImage) {
        return this.studentsService.uploadLogo(studentReqData.profileDto.profileImage['acceptedFile']).pipe(
          mergeMap(res => {
            const createStudentReqObj = this.composeCreateStudentData(studentReqData, res.file);
            return this.studentsService.createStudent(createStudentReqObj).pipe(
              mergeMap(student => [createStudentSuccess({ student }), toggleAddModal()])
            )
          })
        )
      }
      const createStudentReqObj = this.composeCreateStudentData(studentReqData, null);
      return this.studentsService.createStudent(studentReqData).pipe(
        mergeMap(student => [createStudentSuccess({ student }), toggleAddModal()])
      )
    })
  ))
  editStudentRequest$ = createEffect(() => this.actions$.pipe(
    ofType(editStudentRequest),
    mergeMap(action => {
      const studentReqData = this.processStudentReqData(action.student);
      if (studentReqData.profileDto.profileImage) {
        return this.studentsService.editStudent(studentReqData).pipe(
          map(student => editStudentResponse({ student }))
        )
      }
    })
  ))
  deleteStudentRequest$ = createEffect(() => this.actions$.pipe(
    ofType(deleteStudentRequest),
    mergeMap(action => this.studentsService.deleteStudent(action.student).pipe(
      map(res => deleteStudentSuccess({ student: action.student }))
    ))
  ))
  composeCreateStudentData(student: StudentModel, file: string) {
    const studentCopy: StudentModel = { ...student, };
    if (studentCopy.profileDto.profileImage) {
      studentCopy.profileDto.profileImage = file;
    }
    if (studentCopy.guardianDetailsDto.phone) {
      studentCopy.guardianDetailsDto.phone = student.guardianDetailsDto.phone['phoneNum'];
    }
    if (studentCopy.profileDto['country']) {
      studentCopy.profileDto.countryId = student.profileDto['country'].id;
    }
    return studentCopy
  }
  processStudentReqData(student: StudentModel) {
    const processedProfileDTO = this.processProfileDTO(student);
    const processguardianDetailsDto = this.processguardianDetailsDto(processedProfileDTO);
    return processguardianDetailsDto;
  }
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
  constructor(
    private actions$: Actions,
    private studentsService: StudentsService,
    private store: Store<StudentsStateModel>
  ) { }
}
