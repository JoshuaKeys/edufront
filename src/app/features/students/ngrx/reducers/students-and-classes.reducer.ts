import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter } from '@ngrx/entity';
import { StudentsXClassesModel } from '../../models/students-x-classes.model';
import {
  initClassesAndStudentsResponse,
  deleteStudentSuccess,
  editStudentResponse,
  uploadStudentsViaExcelSuccess,
  insertStudents,
  updateStudents,
  refreshStudentXClass
} from '../actions/class-students.actions';

const studentsAndClassesAdapter = createEntityAdapter<StudentsXClassesModel>();
const initialState = studentsAndClassesAdapter.getInitialState();
export const studentsAndClassesReducer = createReducer(
  initialState,
  on(initClassesAndStudentsResponse, (state, action) => {
    return studentsAndClassesAdapter.addAll(action.studentsXclasses, state);
  }),
  on(deleteStudentSuccess, (state, action) => {
    return studentsAndClassesAdapter.removeOne(
      action.student.profileDto.id,
      state
    );
  }),
  on(insertStudents, (state, action) => {
    return studentsAndClassesAdapter.addMany(action.students, state);
  }),
  on(updateStudents, (state, action) => {
    let stateCopy = JSON.parse(JSON.stringify(state));
    action.students.forEach(student => {
      stateCopy.entities[student.id] = student;
    });
    return stateCopy;
  })
);
export const { selectAll } = studentsAndClassesAdapter.getSelectors();
