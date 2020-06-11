import { createReducer, on } from '@ngrx/store';
import { StudentModel } from 'src/app/shared/models/student.model';
import { fetchStudentByIdResponse } from '../actions/class-students.actions';

const initialState: StudentModel = null;
export const studentEditReducer = createReducer(initialState,
  on(fetchStudentByIdResponse, (state, action) => {
    return action.student;
  })
)
