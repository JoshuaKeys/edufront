import { createReducer, on } from '@ngrx/store';
import { StudentModel } from '../../models/student.model';
import { editStudentRequest, fetchStudentByIdResponse } from '../actions/class-students.actions';

const initialState: StudentModel = null;
export const studentsEditReducer = createReducer(initialState,
  on(fetchStudentByIdResponse, (state, action) => {
    return action.student;
  })
);

