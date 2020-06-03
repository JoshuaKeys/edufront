import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StudentsService } from '../services/students.service';
import { mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import {
  initClassesAndStudentsResponse,
  editStudentSuccess,
  initClassesAndStudentsRequest,
  fetchedClassesSuccess,
  fetchedStudentsSuccess,
  createStudentRequest,
  createStudentSuccess,
  deleteStudentRequest,
  deleteStudentSuccess,
  editStudentRequest,
  fetchStudentByIdResponse,
  fetchStudentByIdRequest,
  uploadExcelSheets,
  uploadExcelSheetsSuccess
} from './actions/class-students.actions';

import { toggleAddModal } from './actions/students-modal.actions';
import { Store } from '@ngrx/store';
import { StudentsStateModel } from '../models/students-state.model';
import { selectAllStudents, selectAllClasses } from './selectors';
import { StudentsXClassesModel } from '../models/students-x-classes.model';
import { StudentModel } from '../models/student.model';
import { uploadSchoolLogoRequest } from '../../school-profile-v2/ngrx/actions';

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
  ));
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
  ));
  createStudentRequest$ = createEffect(() => this.actions$.pipe(
    ofType(createStudentRequest),
    mergeMap(action => this.studentsService.uploadLogo(action.student.profileDto.profileImgObj.acceptedFile).pipe(
      mergeMap(profilePic => {
        const studentReqObj = this.composeCreateStudentData(action.student, profilePic.file);
        return this.studentsService.createStudent(studentReqObj).pipe(
          mergeMap(student => [createStudentSuccess({ student }), toggleAddModal()])
        )
      })
    )),

  ));
  deleteStudentRequest$ = createEffect(() => this.actions$.pipe(
    ofType(deleteStudentRequest),
    mergeMap(action => this.studentsService.deleteStudent(action.student).pipe(
      map(res => deleteStudentSuccess({ student: action.student }))
    ))
  ));
  fetchStudentById$ = createEffect(() => this.actions$.pipe(
    ofType(fetchStudentByIdRequest),
    mergeMap(action => this.studentsService.getStudentById(action.student).pipe(
      map(res => fetchStudentByIdResponse({ student: res }))
    ))
  ))
  editStudentRequest = createEffect(() => this.actions$.pipe(
    ofType(editStudentRequest),
    mergeMap(action => {
      console.log(action.student.profileDto)
      if (action.student.profileDto.profileImgObj && action.student.profileDto.profileImgObj.imageUrl) {
        const profilePic = action.student.profileDto.profileImgObj.imageUrl;
        const studentModel = this.composeCreateStudentData(action.student, profilePic);
        return this.studentsService.editStudent(studentModel).pipe(
          map(student => editStudentSuccess({ student }))
        )
      } else if (action.student.profileDto.profileImgObj && action.student.profileDto.profileImgObj.acceptedFile) {
        return this.studentsService.uploadLogo(action.student.profileDto.profileImgObj.acceptedFile).pipe(
          mergeMap(profilePic => {
            const studentModel = this.composeCreateStudentData(action.student, profilePic.file);
            return this.studentsService.editStudent(studentModel).pipe(
              map(student => editStudentSuccess({ student }))
            )
          })
        )
      } else {
        const studentModel = this.composeCreateStudentData(action.student, '');
        return this.studentsService.editStudent(studentModel).pipe(
          map(student => editStudentSuccess({ student }))
        )
      }
    })
  ))
  uploadExcelSheetRequest$ = createEffect(() => this.actions$.pipe(
    ofType(uploadExcelSheets),
    mergeMap(action => this.studentsService.uploadExcellSheet(action.file).pipe(
      map(res => {
        console.log(res);
        return uploadExcelSheetsSuccess()
      })
    ))
  ))
  composeCreateStudentData(studentData: StudentModel, profilePic: string) {
    console.log(studentData);
    let createStudentReqObj: StudentModel = {
      guardianDetailsDto: {
        ...studentData.guardianDetailsDto,
        phone: studentData.guardianDetailsDto.phone['phoneNum'],
      },
      profileDto: {
        ...studentData.profileDto,
        countryId: studentData.profileDto['country'].id,
        profileImage: profilePic,
        profileImgObj: undefined,
        lastName: studentData.profileDto['familyName']
      }
    };

    return createStudentReqObj;
  }
  constructor(
    private actions$: Actions,
    private studentsService: StudentsService,
    private store: Store<StudentsStateModel>
  ) { }
}
