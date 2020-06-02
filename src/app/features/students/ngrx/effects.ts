import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StudentsService } from '../services/students.service';
import { mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { initClassesAndStudentsResponse, initClassesAndStudentsRequest, fetchedClassesSuccess, fetchedStudentsSuccess, createStudentRequest, createStudentSuccess, deleteStudentRequest, deleteStudentSuccess } from './actions/class-students.actions';
import { toggleAddModal } from './actions/students-modal.actions';
import { Store } from '@ngrx/store';
import { StudentsStateModel } from '../models/students-state.model';
import { selectAllStudents, selectAllClasses } from './selectors';
import { StudentsXClassesModel } from '../models/students-x-classes.model';

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
    mergeMap(action => this.studentsService.createStudent(action.student).pipe(
      mergeMap(student => [createStudentSuccess({ student }), toggleAddModal()])
    ))
  ))
  deleteStudentRequest$ = createEffect(() => this.actions$.pipe(
    ofType(deleteStudentRequest),
    mergeMap(action => this.studentsService.deleteStudent(action.student).pipe(
      map(res => deleteStudentSuccess({ student: action.student }))
    ))
  ))
  constructor(
    private actions$: Actions,
    private studentsService: StudentsService,
    private store: Store<StudentsStateModel>
  ) { }
}
